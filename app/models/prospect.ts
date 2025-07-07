import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import EmailSent from '#models/emails_sent'

/**
 * The Prospect model represents a business prospect scraped from OpenStreetMap.
 */
export default class Prospect extends BaseModel {
  /**
   * The unique identifier for the prospect.
   */
  @column({ isPrimary: true })
  // @required @example(1)
  declare public id: number

  /**
   * The OpenStreetMap ID of the prospect.
   */
  @column()
  // @example(123456789)
  declare public osm_id: number

  /**
   * The name of the prospect (e.g., "La p'tite fleuriste").
   */
  @column()
  // @example('La p\'tite fleuriste')
  declare public name: string | null

  /**
   * The category of the prospect (e.g., "restaurant", "florist").
   */
  @column()
  // @example('florist')
  declare public category: string | null

  /**
   * The email address of the prospect.
   */
  @column()
  // @example('lapetitefloriste@gmail.com')
  declare public email: string | null

  /**
   * The phone number of the prospect.
   */
  @column()
  // @example('+33123456789')
  declare public phone: string | null

  /**
   * The website URL of the prospect.
   */
  @column()
  // @example('https://www.lapetitefleuriste.com')
  declare public website: string | null

  /**
   * The street address of the prospect.
   */
  @column()
  // @example('123 Rue de la Fleur')
  declare public address: string | null

  /**
   * The postal code of the prospect.
   */
  @column()
  // @example('75001')
  declare public postcode: string | null

  /**
   * The city of the prospect.
   */
  @column()
  // @example('Paris')
  declare public city: string | null

  /**
   * The latitude of the prospect's location.
   */
  @column()
  // @example(48.8566)
  declare public latitude: number | null

  /**
   * The longitude of the prospect's location.
   */
  @column()
  // @example(2.3522)
  declare public longitude: number | null

  /**
   * The timestamp when the prospect was scraped.
   */
  @column.dateTime({ autoCreate: true })
  // @required @example('2023-10-01T00:00:00Z')
  declare public scraped_at: DateTime

  /**
   * Whether the prospect has a website.
   */
  @column()
  // @required @example(true)
  declare public has_website: boolean



  /**
   * Whether the prospect's email has been validated.
   */
  @column()
  // @required @example(false)
  declare public email_validated: boolean

  /**
   * Whether the prospect has been contacted.
   */
  @column()
  // @required @example(false)
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
