import factory from '@adonisjs/lucid/factories'
import Prospect from '#models/prospect'
import { DateTime } from 'luxon'

/**
 * Factory to generate dummy Prospect data
 */
export const ProspectFactory = factory
  .define(Prospect, async ({ faker }) => {
    const hasWebsite = faker.datatype.boolean()
    return {
      name: faker.company.name(),
      category: faker.helpers.arrayElement(['restaurant', 'florist', 'plumber', 'bakery', 'supermarket', 'pharmacy']),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      website: hasWebsite ? faker.internet.url() : null,
      address: faker.location.streetAddress(),
      postcode: faker.location.zipCode(),
      city: faker.location.city(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      scraped_at: DateTime.fromJSDate(faker.date.recent()),
      has_website: hasWebsite,
      email_validated: faker.datatype.boolean(),
      contacted: faker.datatype.boolean(),
    }
  })
  .build()
