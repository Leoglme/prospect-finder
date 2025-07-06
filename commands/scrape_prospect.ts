import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import GoogleMapsScraper from '#services/google_maps_scraper_service'
import { ResultType } from '#services/google_maps_scraper_service'
import type { OpenStreetMapElement } from '#services/open_street_map_service'
import OpenStreetMapService from '#services/open_street_map_service'
import TimeService from '#services/time_service'

export default class ScrapeProspect extends BaseCommand {
  static commandName: string = 'scrape:prospect'
  static description: string = ''

  static options: CommandOptions = {}

  public async run(): Promise<void> {
    // const city: string = 'Iffendic'
    // const limit: number = 5
    // const businesses: OpenStreetMapElement[] = await ScrapeProspect.findBusinessesInCity(
    //   city,
    //   limit
    // )

    // this.logger.info(`Found ${businesses.length} businesses in ${city}:`)
    // this.logger.info(`Start google maps scraping for ${city}`)

    try {
      await GoogleMapsScraper.initAndNavigate()
      this.logger.info('Scraping started successfully')
    } catch (error) {
      console.log(error)
      this.logger.error('Error during starter google maps:', error)
      process.exitCode = 1
    }

    const search: string = 'Le breton Iffendic'

    try {
      await GoogleMapsScraper.searchInGoogleMaps(search)
      await TimeService.delay(3000)
      const resultType: ResultType | null = await GoogleMapsScraper.detectResultType()

      if (resultType) {
        if (resultType === ResultType.LIST) {
          this.logger.info('Detected result type: LIST')
        }

        if (resultType === ResultType.SINGLE) {
          this.logger.info('Detected result type: SINGLE')
        }
      }

      this.logger.info(`Scraping for search ${search} completed successfully`)
    } catch (error) {
      console.log(error)
      this.logger.error('Error during scraping:', error)
      process.exitCode = 1
    }

    // for (const business of businesses) {
    //   const businessName: string | undefined = business.tags.name
    //
    //   this.logger.info(`Processing business: ${businessName}`)
    //
    //   if (businessName) {
    //     const search: string = `${businessName} ${city}`
    //     this.logger.info(`Starting Google Maps scraping for query: ${search}`)
    //
    //     try {
    //       await GoogleMapsScraper.searchInGoogleMaps(search)
    //       await TimeService.delay(3000)
    //       this.logger.info(`Scraping for search ${search} completed successfully`)
    //     } catch (error) {
    //       console.log(error)
    //       this.logger.error('Error during scraping:', error)
    //       process.exitCode = 1
    //     }
    //   }
    // }
  }

  public static async findBusinessesInCity(
    city: string,
    limit: number = 20
  ): Promise<OpenStreetMapElement[]> {
    try {
      // Initialize the service
      await OpenStreetMapService.initService()

      // Find businesses in the specified city
      return await OpenStreetMapService.findBusinessesInCity(city, limit)
    } catch (error) {
      const errorMessage: string = (error as Error).message || 'Unknown error'
      console.error('Error:', errorMessage)
      throw new Error(`Failed to find businesses in ${city}: ${errorMessage}`)
    }
  }
}
