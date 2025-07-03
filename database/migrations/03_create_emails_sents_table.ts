import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'emails_sents'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.integer('prospect_id').unsigned().references('id').inTable('prospects').onDelete('CASCADE')
      table.string('mailjet_id').notNullable()
      table.timestamp('sent_at').notNullable().defaultTo(this.now())
      table.string('status').nullable() // ex: "delivered", "bounced", etc.
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
