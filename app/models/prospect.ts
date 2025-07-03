import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import EmailSent from '#models/email_sent'

/**
 * The Prospect model represents a business prospect scraped from OpenStreetMap.
 */
export default class Prospect extends BaseModel {
  /**
   * The unique identifier for the prospect.
   */
  @column({ isPrimary: true })
  declare public id: number

  /**
   * The name of the prospect (e.g., "La p'tite fleuriste").
   */
  @column()
  declare public name: string | null

  /**
   * The category of the prospect (e.g., "restaurant", "florist").
   */
  @column()
  declare public category: string | null

  /**
   * The email address of the prospect.
   */
  @column()
  declare public email: string | null

  /**
   * The phone number of the prospect.
   */
  @column()
  declare public phone: string | null

  /**
   * The website URL of the prospect.
   */
  @column()
  declare public website: string | null

  /**
   * The street address of the prospect.
   */
  @column()
  declare public address: string | null

  /**
   * The postal code of the prospect.
   */
  @column()
  declare public postcode: string | null

  /**
   * The city of the prospect.
   */
  @column()
  declare public city: string | null

  /**
   * The latitude of the prospect's location.
   */
  @column()
  declare public latitude: number | null

  /**
   * The longitude of the prospect's location.
   */
  @column()
  declare public longitude: number | null

  /**
   * The timestamp when the prospect was scraped.
   */
  @column.dateTime({ autoCreate: true })
  declare public scraped_at: DateTime

  /**
   * Whether the prospect has a website.
   */
  @column()
  declare public has_website: boolean



  /**
   * Whether the prospect's email has been validated.
   */
  @column()
  declare public email_validated: boolean

  /**
   * Whether the prospect has been contacted.
   */
  @column()
  declare public contacted: boolean

  /**
   * Relationship to emails sent to this prospect.
   */
  @hasMany(() => EmailSent)
  declare public emailsSent: HasMany<typeof EmailSent>

  /**
   * The timestamp when the promo code was created.
   */
  @column.dateTime({ autoCreate: true })
  // @required @example('2023-10-01T00:00:00Z')
  declare public created_at: DateTime

  /**
   * The timestamp when the promo code was last updated.
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  // @required @example('2023-10-01T00:00:00Z')
  declare public updated_at: DateTime
}
