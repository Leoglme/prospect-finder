import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Prospect from '#models/prospect'

/**
 * The EmailSent model represents an emails sent to a prospect via Mailjet.
 */
export default class EmailsSent extends BaseModel {
  /**
   * The unique identifier for the email sent record.
   */
  @column({ isPrimary: true })
  // @required @example(1)
  declare public id: number

  /**
   * The ID of the associated prospect.
   */
  @column()
  // @required @example(1)
  declare public prospect_id: number

  /**
   * The Mailjet ID of the sent email.
   */
  @column()
  // @required @example('mj-1234567890')
  declare public mailjet_id: string

  /**
   * The timestamp when the email was sent.
   */
  @column.dateTime({ autoCreate: true })
  // @required @example('2023-10-01T00:00:00Z')
  declare public sent_at: DateTime

  /**
   * The status of the email (e.g., "delivered", "bounced").
   */
  @column()
  // @required @example('delivered')
  declare public status: string | null

  /**
   * Relationship to the associated prospect.
   */
  @belongsTo(() => Prospect)
  declare public prospect: BelongsTo<typeof Prospect>

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
