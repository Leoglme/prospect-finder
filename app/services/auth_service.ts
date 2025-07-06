import User from '#models/user'
import type { SignInPayload } from '#interfaces/auth_interface'
import logger from '@adonisjs/core/services/logger'

/**
 * Service to handle user sign up operations
 * @class AuthService
 */
export default class AuthService {
  /**
   * Authenticate a user with email and password
   * @param {SignInPayload} payload - The login data
   * @returns {Promise<User>} - The authenticated user instance
   */
  public static async signIn(payload: SignInPayload): Promise<User> {
    try {
      const user: User = await User.verifyCredentials(payload.email, payload.password)
      // return user
      return user
    } catch (error: any) {
      logger.error(error)
      throw error
    }
  }
}
