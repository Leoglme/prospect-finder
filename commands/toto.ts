import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import OpenStreetMapService, {type OpenStreetMapElement} from "#services/open_street_map_service";

export default class Toto extends BaseCommand {
  static commandName = 'toto'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const city: string = 'Iffendic'
    await OpenStreetMapService.initService()
    const openStreetMapElement: OpenStreetMapElement[] = await OpenStreetMapService.findBusinessesInCity(city)
    const unsavedBusinesses: OpenStreetMapElement[] = await OpenStreetMapService.filterUnsavedBusinesses(openStreetMapElement)
    await OpenStreetMapService.saveBusinessesInDatabase(unsavedBusinesses)
    console.log(`Found ${unsavedBusinesses.length} unsaved businesses in ${city}`)
  }
}
