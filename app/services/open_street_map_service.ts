import type {AxiosResponse} from 'axios';
import axios from 'axios';

type OpenStreetMapTag = {
    "addr:city"?: string;
    "addr:housenumber"?: string;
    "addr:postcode"?: string;
    "addr:street"?: string;
    "amenity"?: string;
    "cuisine"?: string;
    "email"?: string;
    "contact:email"?: string;
    "operator:email"?: string;
    "name"?: string;
    "opening_hours"?: string;
    "phone"?: string;
    "operator:phone"?: string;
    "website"?: string;
};

type OpenStreetMapElement ={
    id: number;
    type: string;
    tags: OpenStreetMapTag[];
    lat: number;
    lon: number;
}

type OpenStreetMapResponse = {
    elements: OpenStreetMapElement[];
}

export default class Open_street_map_service {
    private static overpassApiUrl: string = 'https://overpass-api.de/api/interpreter';

    /**
     * Initializes the OpenStreetMap service by setting the API endpoint.
     * @returns {Promise<void>} A promise that resolves when the service is initialized.
     */
    public static async initService(): Promise<void> {
        try {
            const response = await axios.get(`${this.overpassApiUrl}?data=[out:json];node(1);out;`);
            if (response.status !== 200) {
                throw new Error('Failed to connect to Overpass API');
            }
            console.log('Open_street_map_service initialized successfully');
        } catch (error) {
            const errorMessage: string = (error as Error).message || 'Unknown error';
            throw new Error(`Initialization failed: ${errorMessage}`);
        }
    }

    /**
     * Queries OpenStreetMap for businesses (restaurants, plumbers, florists, etc.) in the specified city.
     * @param {string} city The name of the city to search for businesses (e.g., "Iffendic").
     * @returns {Promise<OpenStreetMapElement[]>} A promise that resolves to a list of businesses.
     */
    public static async findBusinessesInCity(city: string): Promise<OpenStreetMapElement[]> {
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
    `;

        try {
            const response: AxiosResponse<OpenStreetMapResponse> = await axios.post(this.overpassApiUrl, query, {
                headers: { 'Content-Type': 'text/plain' },
            });



            return response.data.elements || []
        } catch (error) {
            const errorMessage: string = (error as Error).message || 'Unknown error';
            throw new Error(`Failed to fetch businesses: ${errorMessage}`);
        }
    }
}
