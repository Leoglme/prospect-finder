// import GoogleMapsScraper from '#services/google_maps_scraper_service'
// import PuppeteerService from '#services/puppeteer_service'

// const search: string = 'Les Compagnons de la Chambre au Loup iffendic'
// try {
//   await GoogleMapsScraper.initAndNavigate(search)
//   // Ajoutez ici d'autres opérations de scraping si nécessaire
// } catch (error) {
//   console.error('Erreur lors du scraping:', error)
// } finally {
//   await PuppeteerService.closeBrowser()
// }

import OpenStreetMapService from "#services/open_street_map_service";
import type { OpenStreetMapElement } from "#services/open_street_map_service";

const city: string = 'Iffendic'
await OpenStreetMapService.initService()
const openStreetMapElement: OpenStreetMapElement[] = await OpenStreetMapService.findBusinessesInCity(city)
const unsavedBusinesses: OpenStreetMapElement[] = await OpenStreetMapService.filterUnsavedBusinesses(openStreetMapElement)
console.log(`Found ${unsavedBusinesses.length} unsaved businesses in ${city}`)
