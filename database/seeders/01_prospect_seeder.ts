import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { ProspectFactory } from '#database/factories/prospect_factory'

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
    await ProspectFactory.createMany(10)
  }
}
