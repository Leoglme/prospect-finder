import puppeteer from 'puppeteer';
import type { Browser, Page } from 'puppeteer';
import userAgent from 'user-agents';

export default class Puppeteer_service {
    private static browser: Browser;
    private static page: Page;

    /**
     * Initializes the Puppeteer browser with specified options and applies stealth plugin to prevent detection.
     * @returns {Promise<void>} A promise that resolves when the browser is successfully launched.
     */
    public static async initBrowser(): Promise<void> {
        this.browser = await puppeteer.launch({
            headless: false,
            args: [
                '--start-maximized',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-infobars'
            ],
            browser: "chrome",
            defaultViewport: {
                width: 1920,
                height: 1080,
                isMobile: false
            },
            acceptInsecureCerts: false,
        });
    }

    /**
     * Initializes a new page in the browser.
     * @returns {Promise<void>} A promise that resolves when the page is successfully created.
     */
    public static async initPage(): Promise<void> {
        this.page = await this.browser.newPage();
        await this.page.setUserAgent(new userAgent().random().toString())
    }

    /**
     * Navigates to a specified URL using the Puppeteer page instance.
     * @param {string} url The URL to navigate to.
     * @returns {Promise<void>} A promise that resolves when the page has successfully navigated to the URL.
     */
    public static async openPageWithUrl(url: string): Promise<void> {
        await this.page.goto(url);
    }
}
