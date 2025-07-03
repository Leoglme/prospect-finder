import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { EmailSentFactory } from '#database/factories/email_sent_factory'
import Prospect from '#models/prospect'

/**
 * Seeder to populate the emails_sent table with dummy data
 * @class EmailSentSeeder
 */
export default class extends BaseSeeder {
  /**
   * Run the seeder
   * @returns {Promise<void>} - A promise that resolves with no return value
   */
  public async run(): Promise<void> {
    // Get existing prospects to assign emails to
    const prospects: Prospect[] = await Prospect.all()
    if (prospects.length === 0) {
      console.warn('No prospects found. Please run ProspectSeeder first.')
      return
    }

    // Create 1-3 email sent records for each prospect
    for (const prospect of prospects) {
      await EmailSentFactory.merge({ prospect_id: prospect.id }).createMany(
        Math.floor(Math.random() * 3) + 1
      )
    }
  }
}
