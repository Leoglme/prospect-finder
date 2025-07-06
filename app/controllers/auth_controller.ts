import type { HttpContext } from '@adonisjs/core/http'
import AuthService from '#services/auth_service'
import logger from '@adonisjs/core/services/logger'
import type { SignInPayload, SignInResponse } from '#interfaces/auth_interface'
import { loginValidator } from '#validators/auth_validator'
import User from '#models/user'
import type { AccessToken } from '@adonisjs/auth/access_tokens'

/**
 * Controller to handle user authentication operations
 */
export default class AuthController {
  /**
   * Handle user login
   * @param {HttpContext} ctx - The HTTP context containing the request and response objects
   * @param {HttpContext['request']} ctx.request - The HTTP request object
   * @param {HttpContext['response']} ctx.response - The HTTP response object
   * @returns {Promise<void>} - A promise that resolves with no return value
   */
  /**
   * @signIn
   * @operationId signIn
   * @tag Auth
   * @summary User Sign In
   * @description This endpoint allows users to sign in to the application. It validates the login credentials and returns the authenticated user along with their access token.
   * @requestBody <loginValidator>
   * @content application/json
   * @responseBody 200 - <SignInResponse>
   * @responseBody 401 - <ErrorResponse>
   */
  public async signIn({ request, response, auth }: HttpContext): Promise<SignInResponse | void> {
    try {
      const payload: SignInPayload = await loginValidator.validate(request.all())
      const user: User = await AuthService.signIn(payload)
      const token: AccessToken = await auth.use('api').createToken(user)
      return response.json(token)
    } catch (error) {
      logger.error(error)
      const errorMessages: string[] = error.messages
        ? error.messages.map(({ message }: { message: string }): string => message)
        : ['An unexpected error occurred']
      return response.unauthorized({
        messages: errorMessages,
        error: error.message,
      })
    }
  }

  /**
   * Get authenticated user
   * @param {HttpContext} ctx - The HTTP context containing the auth object
   * @param {HttpContext['auth']} ctx.auth - The authentication object
   * @param {HttpContext['response']} ctx.response - The HTTP response object
   * @returns {Promise<void>} - A promise that resolves with the authenticated user
   */
  /**
   * @me
   * @operationId getAuthenticatedUser
   * @tag Auth
   * @summary Get Authenticated User
   * @description This endpoint retrieves the authenticated user's information using the provided access token.
   * @security BearerAuth
   * @responseBody 200 - <User>
   * @responseBody 401 - <ErrorResponse>
   */
  public async me({ auth, response }: HttpContext): Promise<void> {
    try {
      const user: User & { currentAccessToken: AccessToken } = await auth.use('api').authenticate()
      return response.ok(user)
    } catch (error) {
      logger.error(error)
      return response.unauthorized({
        messages: ['Accès non autorisé'],
        error: error.message,
      })
    }
  }
}
