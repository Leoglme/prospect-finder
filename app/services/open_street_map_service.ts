import type { AxiosResponse } from 'axios'
import axios from 'axios'
import ProspectService from "#services/prospect_service";
import Prospect from "#models/prospect";

export type OpenStreetMapTag = {
  'addr:city'?: string
  'addr:housenumber'?: string
  'addr:postcode'?: string
  'addr:street'?: string
  'amenity'?: string
  'cuisine'?: string
  'email'?: string
  'contact:email'?: string
  'operator:email'?: string
  'name'?: string
  'opening_hours'?: string
  'phone'?: string
  'contact:phone'?: string
  'operator:phone'?: string
  'website'?: string
}

export type OpenStreetMapElement = {
  id: number
  type: string
  tags: OpenStreetMapTag
  lat: number
  lon: number
}

export type OpenStreetMapResponse = {
  elements: OpenStreetMapElement[]
}

export default class OpenStreetMapService {
  private static overpassApiUrl: string = 'https://overpass-api.de/api/interpreter'

  /**
   * Initializes the OpenStreetMap service by setting the API endpoint.
   * @returns {Promise<void>} A promise that resolves when the service is initialized.
   */
  public static async initService(): Promise<void> {
    try {
      const response = await axios.get(`${this.overpassApiUrl}?data=[out:json];node(1);out;`)
      if (response.status !== 200) {
        throw new Error('Failed to connect to Overpass API')
      }
      console.log('Open_street_map_service initialized successfully')
    } catch (error) {
      const errorMessage: string = (error as Error).message || 'Unknown error'
      throw new Error(`Initialization failed: ${errorMessage}`)
    }
  }

  /**
   * Queries OpenStreetMap for businesses (restaurants, plumbers, florists, etc.) in the specified city.
   * @param {string} city The name of the city to search for businesses (e.g., "Iffendic").
   * @returns {Promise<OpenStreetMapElement[]>} A promise that resolves to a list of businesses.
   */
  public static async findBusinessesInCity(
    city: string,
  ): Promise<OpenStreetMapElement[]> {
    const query = `
        [out:json];
        area[name="${city}"]->.searchArea;
        (
            node["shop"](area.searchArea);
            node["amenity"](area.searchArea);
            node["craft"](area.searchArea);
            node["office"](area.searchArea);
        );
        out body;
    `

    try {
      const response: AxiosResponse<OpenStreetMapResponse> = await axios.post(
        this.overpassApiUrl,
        query,
        {
          headers: { 'Content-Type': 'text/plain' },
        }
      )

      console.log(`Total number of business for ${city} : ${response.data.elements.length}`)

      return response.data.elements
    } catch (error) {
      const errorMessage: string = (error as Error).message || 'Unknown error'
      throw new Error(`Failed to fetch businesses: ${errorMessage}`)
    }
  }

  /**
   * Checks if a business is already saved in the prospects table.
   * @param {OpenStreetMapElement} business - The business to check.
   * @returns {Promise<boolean>} - A promise that resolves to true if the business is saved, false otherwise.
   */
  public static async isBusinessSaved(
    business: OpenStreetMapElement
  ): Promise<boolean> {
    try {
      // Assuming you have a Prospect model with a method to check if a business is saved
      const prospect: Prospect | null = await ProspectService.findProspectByOsmId(business.id)
      return prospect !== null
    } catch (error) {
      const errorMessage: string = (error as Error).message || 'Unknown error'
      throw new Error(`Failed to check if business is saved: ${errorMessage}`)
    }
  }

  /**
   * Take OpenStreetMapElement array and return all in not saved in table prospects
   * @param {OpenStreetMapElement[]} businesses - Array of OpenStreetMapElement objects representing businesses.
   * @return {Promise<OpenStreetMapElement[]>} - A promise that resolves to an array of OpenStreetMapElement objects that are not saved in the prospects table.
   */
  public static async filterUnsavedBusinesses(
    businesses: OpenStreetMapElement[]
  ): Promise<OpenStreetMapElement[]> {
    try {
      // Assuming you have a Prospect model with a method to check if a business is saved
      const unsavedBusinesses: OpenStreetMapElement[] = []

      for (const business of businesses) {
        // Check if the business is already saved in the prospects table
        const isSaved: boolean = await this.isBusinessSaved(business)

        if (!isSaved) {
          unsavedBusinesses.push(business)
        }
      }

      return unsavedBusinesses
    } catch (error) {
      const errorMessage: string = (error as Error).message || 'Unknown error'
      throw new Error(`Failed to filter unsaved businesses: ${errorMessage}`)
    }
  }

  /**
   * Converts an OpenStreetMapElement to a Prospect object.
   * @param {OpenStreetMapElement} business - The OpenStreetMapElement object to convert.
   * @returns {Prospect} - A Prospect object with the relevant fields populated.
   */
  public static convertOpenStreetMapElementToProspect(
    business: OpenStreetMapElement
  ): Prospect {
    const prospect = new Prospect()

    prospect.osm_id = business.id
    prospect.name = business.tags.name || null
    prospect.category = business.tags.amenity || null
    prospect.email = business.tags['contact:email'] || business.tags['operator:email'] || business.tags.email || null
    prospect.phone = business.tags['contact:phone'] || business.tags['operator:phone'] || business.tags.phone || null
    prospect.website = business.tags.website || null
    prospect.address = business.tags['addr:street'] ? `${business.tags['addr:housenumber'] || ''} ${business.tags['addr:street']}`.trim() : null
    prospect.postcode = business.tags['addr:postcode'] || null
    prospect.city = business.tags['addr:city'] || null
    prospect.latitude = business.lat
    prospect.longitude = business.lon
    prospect.has_website = !!prospect.website
    prospect.email_validated = !!prospect.email

    return prospect
  }

  /**
   * Converts an array of OpenStreetMapElement objects to an array of Prospect objects.
   * @param {OpenStreetMapElement[]} businesses - Array of OpenStreetMapElement objects.
   * @returns {Prospect[]} - Array of Prospect objects.
   */
  public static convertOpenStreetMapElementsToProspects(
    businesses: OpenStreetMapElement[]
  ): Prospect[] {
    return businesses.map((business: OpenStreetMapElement): Prospect => this.convertOpenStreetMapElementToProspect(business))
  }

  /**
   * Saves unsaved businesses to the database.
   * @param {OpenStreetMapElement[]} unsavedBusinesses - Array of OpenStreetMapElement objects representing unsaved businesses.
   * @returns {Promise<void>} - A promise that resolves when the businesses are saved.
   */
  public static async saveBusinessesInDatabase(
    unsavedBusinesses: OpenStreetMapElement[]
  ): Promise<void> {
    try {
      const prospects: Prospect[] = this.convertOpenStreetMapElementsToProspects(unsavedBusinesses)

      await ProspectService.createProspects(prospects)

      console.log(`Saved ${prospects.length} unsaved businesses to the database.`)
    } catch (error) {
      const errorMessage: string = (error as Error).message || 'Unknown error'
      throw new Error(`Failed to save businesses in database: ${errorMessage}`)
    }
  }
}
