import puppeteer from 'puppeteer'
import type { Browser, Page, ElementHandle } from 'puppeteer'
import userAgent from 'user-agents'

export default class PuppeteerService {
  public static browser: Browser
  public static page: Page

  /**
   * Initializes the Puppeteer browser with specified options and applies stealth plugin to prevent detection.
   * @returns {Promise<void>} A promise that resolves when the browser is successfully launched.
   */
  public static async initBrowser(): Promise<void> {
    this.browser = await puppeteer.launch({
      headless: false,
      args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox', '--disable-infobars'],
      browser: 'chrome',
      defaultViewport: {
        width: 1920,
        height: 1080,
        isMobile: false,
      },
      acceptInsecureCerts: false,
    })
  }

  /**
   * Initializes a new page in the browser.
   * @returns {Promise<void>} A promise that resolves when the page is successfully created.
   */
  public static async initPage(): Promise<void> {
    this.page = await this.browser.newPage()
    await this.page.setUserAgent(new userAgent().random().toString())
  }

  /**
   * Navigates to a specified URL using the Puppeteer page instance.
   * @param {string} url The URL to navigate to.
   * @returns {Promise<void>} A promise that resolves when the page has successfully navigated to the URL.
   */
  public static async openPageWithUrl(url: string): Promise<void> {
    await this.page.goto(url)
  }

  /**
   * Finds an element on the page using a CSS selector.
   * @param {string} selector The CSS selector to locate the element.
   * @returns {Promise<ElementHandle | null>} A promise that resolves to the found element or null if not found.
   */
  public static async findElement(selector: string): Promise<ElementHandle | null> {
    try {
      return await this.page.$(selector)
    } catch (error) {
      console.error(
        `Erreur lors de la recherche de l'élément avec le sélecteur "${selector}":`,
        error
      )
      return null
    }
  }

  /**
   * Clicks on an element identified by a CSS selector.
   * @param {string} selector The CSS selector of the element to click.
   * @returns {Promise<boolean>} A promise that resolves to true if the click was successful, false otherwise.
   */
  public static async clickElement(selector: string): Promise<boolean> {
    try {
      const element: ElementHandle | null = await this.findElement(selector)
      if (element) {
        await element.click()
        return true
      }
      console.warn(`Élément avec le sélecteur "${selector}" non trouvé.`)
      return false
    } catch (error) {
      console.error(`Erreur lors du clic sur l'élément avec le sélecteur "${selector}":`, error)
      return false
    }
  }

  /**
   * Closes the browser instance.
   * @returns {Promise<void>} A promise that resolves when the browser is closed.
   */
  public static async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close()
    }
  }
}
