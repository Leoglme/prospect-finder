import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { DateTime } from 'luxon'
import env from '#start/env'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      full_name: faker.person.fullName(),
      email: faker.internet.email(),
      password: env.get('USER_PASSWORD'),
      createdAt: DateTime.fromJSDate(faker.date.recent()),
      updatedAt: DateTime.fromJSDate(faker.date.recent()),
    }
  })
  .build()
