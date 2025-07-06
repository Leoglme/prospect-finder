import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { UserFactory } from '#database/factories/user_factory'
import User from "#models/user";
import env from "#start/env";

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    const users: User[] = await UserFactory.createMany(1)
    // update the first user email and fullName
    if (users.length > 0) {
      users[0].email = env.get('USER_EMAIL')
      users[0].full_name = 'Léo Guillaume'
      // Save the updated user
      await users[0].save()
    }
  }
}
