import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { ProspectFactory } from '#database/factories/prospect_factory'
import { EmailSentFactory } from '#database/factories/email_sent_factory'
import Prospect from "#models/prospect";

/**
 * Seeder to populate the prospects and emails_sent tables with dummy data
 * @class ProspectSeeder
 */
export default class extends BaseSeeder {
  /**
   * Run the seeder
   * @returns {Promise<void>} - A promise that resolves with no return value
   */
  public async run(): Promise<void> {
    // Create 10 prospects
    const prospects: Prospect[] = await ProspectFactory.createMany(10)

    // Create 1-3 emails sent for each prospect
    for (const prospect of prospects) {
      await EmailSentFactory.merge({ prospect_id: prospect.id }).createMany(
        Math.floor(Math.random() * 3) + 1
      )
    }
  }
}
