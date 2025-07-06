import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import env from '#start/env'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  // @required @example(1)
  declare id: number

  @column()
  // @example('John Doe')
  declare full_name: string | null

  @column()
  // @example('jogndoe@gmail.com')
  declare email: string

  @column({ serializeAs: null })
  // @example('hashed_password')
  declare password: string

  @column.dateTime({ autoCreate: true })
  // @example('2023-10-01T00:00:00Z')
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  // @example('2023-10-01T00:00:00Z')
  declare updatedAt: DateTime | null

    /**
   * The access token provider for the user model.
   * This provider is used to generate and validate access tokens for the user.
   */
  public static accessTokens: DbAccessTokensProvider<typeof User> = DbAccessTokensProvider.forModel(User, {
    expiresIn: env.get('API_USER_TOKEN_EXPIRATION_DAYS') + ' days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })
}
