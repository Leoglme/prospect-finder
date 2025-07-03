// import Puppeteer_service from "#services/Puppeteer_service";
//
// await Puppeteer_service.initBrowser()
// await Puppeteer_service.initPage()
// await Puppeteer_service.openPageWithUrl("https://www.google.com")


import Open_street_map_service from "#services/open_street_map_service";

try {
    // Initialize the service
    await Open_street_map_service.initService();

    // Find businesses in Iffendic
    const businesses = await Open_street_map_service.findBusinessesInCity('Iffendic');

    // Log the results
    console.log('Businesses in Iffendic:');
    businesses.forEach((business) => {
        console.log(business);
    });
} catch (error) {
    const errorMessage: string = (error as Error).message || 'Unknown error';
    console.error('Error:', errorMessage);
}
