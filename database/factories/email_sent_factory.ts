import factory from '@adonisjs/lucid/factories'
import EmailSent from '#models/email_sent'
import { DateTime } from 'luxon'

/**
 * Factory to generate dummy EmailSent data
 */
export const EmailSentFactory = factory
  .define(EmailSent, async ({ faker }) => {
    return {
      prospect_id: faker.number.int({ min: 1, max: 100 }),
      mailjet_id: faker.string.uuid(),
      sent_at: DateTime.fromJSDate(faker.date.recent()),
      status: faker.helpers.arrayElement(['delivered', 'bounced', 'opened', 'clicked']),
    }
  })
  .build()
