import PuppeteerService from '#services/puppeteer_service'
import TimeService from '#services/time_service'
import type { ElementHandle } from 'puppeteer'

/**
 * Type representing the result of a Google Maps search
 */
export enum ResultType {
  LIST = 'list',
  SINGLE = 'single',
}

/**
 * Service to handle scraping operations on Google Maps
 */
export default class GoogleMapsScraper {
  /**
   * Accepts the Google Maps cookie consent modal by clicking the "Tout accepter" button.
   * @returns {Promise<boolean>} A promise that resolves to true if the cookies were accepted, false otherwise.
   */
  public static async acceptCookies(): Promise<boolean> {
    try {
      // CSS selector for the aria-label="Tout accepter"
      const acceptButtonSelector: string = 'button[aria-label="Tout accepter"]'

      // CSS selector for the input with the value="Tout accepter"
      const acceptInputSelector: string = 'input[value="Tout accepter"]'

      const button: ElementHandle | null = await PuppeteerService.findElement(acceptButtonSelector)

      const activeSelector: string = button ? acceptButtonSelector : acceptInputSelector

      // Wait until the button is visible (max 10 seconds)
      await PuppeteerService.page.waitForSelector(activeSelector, { timeout: 10000 })

      // Click the button
      const clicked: boolean = await PuppeteerService.clickElement(activeSelector)

      if (clicked) {
        console.log('Modal of cookies successfully accepted')
        // Wait a short time to make sure the modal disappears
        await TimeService.delay(1000)
        return true
      }

      console.log('Impossible to find or click on the "Accept everything" button')
      return false
    } catch (error) {
      console.error('Error during the acceptance of cookies:', error)
      return false
    }
  }

  public static async acceptRestInWebModal(): Promise<boolean> {
    try {
      // Click the button
      const clicked: boolean = await PuppeteerService.clickElement('[class*="qgMOee"]')

      if (clicked) {
        console.log('Web modal successfully accepted')
        // Wait a short time to make sure the modal disappears
        await TimeService.delay(1000)
        return true
      }

      console.log('Impossible to find or click on the "Accept all" button in web modal')
      return false
    } catch (error) {
      console.error('Error during the acceptance of web modal:', error)
      return false
    }
  }

  /**
   * Searches for a query in Google Maps.
   * @param {string} searchQuery The search query to be used in Google Maps.
   * @returns {Promise<void>} A promise that resolves when the search is complete.
   */
  public static async searchInGoogleMaps(searchQuery: string): Promise<void> {
    const searchUrl: string = `https://www.google.fr/maps/search/${encodeURIComponent(searchQuery)}`
    try {
      // Navigate to the search URL
      await PuppeteerService.openPageWithUrl(searchUrl)
    } catch (error) {
      console.error(`Error during search for query "${searchQuery}":`, error)
      throw error
    }
  }

  /**
   * Detects whether the current Google Maps page is a list of results or a single business profile.
   * @returns {Promise<ResultType | null>} A promise that resolves to the type of result (LIST or SINGLE).
   */
  public static async detectResultType(): Promise<ResultType | null> {
    try {
      // Check if the page contains an element with the class "ML-Pane with-Searchbox"
      const listPane: ElementHandle | null =
        await PuppeteerService.findElement('.ml-pane.with-searchbox')
      if (listPane) {
        console.info('Page detected as a list of results')
        return ResultType.LIST
      }

      // Check if the page contains an element with the "ML-Pane" class (without With-Searchbox)
      const singlePane: ElementHandle | null = await PuppeteerService.findElement(
        '.ml-pane:not(.with-searchbox)'
      )
      if (singlePane) {
        console.info('Page detected as a unique Google Business Profile file')
        return ResultType.SINGLE
      }

      console.warn('Type of not detected page (neither list nor single sheet)')
      return null
    } catch (error: any) {
      console.error('Error when detecting the type of result: %s', error.message || error)
      return null
    }
  }

  /**
   * Initializes the browser, opens a page, navigates to a Google Maps URL, and accepts the modals.
   * @returns {Promise<void>} A promise that resolves when the page is ready for scraping.
   */
  public static async initAndNavigate(): Promise<void> {
    try {
      // Initialize the browser and the page
      await PuppeteerService.initBrowser()
      await PuppeteerService.initPage()

      // Navigate to the Google Maps search url
      const googleMapsUrl: string = `https://www.google.fr/maps`
      await PuppeteerService.openPageWithUrl(googleMapsUrl)

      // Accept the cookie modal
      await this.acceptCookies()
      // Accept the rest in web modal if it appears
      await this.acceptRestInWebModal()
    } catch (error) {
      console.error('Error during initialization and navigation:', error)
      throw error
    }
  }
}
