import factory from '@adonisjs/lucid/factories'
import EmailsSent from '#models/emails_sent'
import { DateTime } from 'luxon'

/**
 * Factory to generate dummy EmailsSent data
 */
export const EmailsSentFactory = factory
  .define(EmailsSent, async ({ faker }) => {
    return {
      prospect_id: faker.number.int({ min: 1, max: 100 }),
      mailjet_id: faker.string.uuid(),
      sent_at: DateTime.fromJSDate(faker.date.recent()),
      status: faker.helpers.arrayElement(['delivered', 'bounced', 'opened', 'clicked']),
    }
  })
  .build()
