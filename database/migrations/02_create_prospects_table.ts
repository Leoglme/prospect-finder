import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'prospects'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.bigInteger('osm_id').notNullable().unique()
      table.string('name').nullable()
      table.string('category').nullable()
      table.string('email').nullable().unique()
      table.string('phone').nullable()
      table.string('website').nullable()
      table.string('address').nullable()
      table.string('postcode').nullable()
      table.string('city').nullable()
      table.double('latitude').nullable()
      table.double('longitude').nullable()
      table.timestamp('scraped_at').notNullable().defaultTo(this.now())
      table.boolean('has_website').notNullable().defaultTo(false)
      table.boolean('email_validated').notNullable().defaultTo(false)
      table.boolean('contacted').notNullable().defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
