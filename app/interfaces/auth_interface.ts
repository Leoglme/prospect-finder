/**
 *  Interface for the login payload.
 */
export interface SignInPayload {
  email: string
  password: string
}

/**
 * Interface for the access token.
 */
export interface SignInResponse {
  /**
   * A unique type to identify a bucket of tokens inside the
   * storage layer.
   */
  type: string

  /**
   * Recognizable name for the token
   */
  name?: string

  /**
   * The actual token value. It is a combination of the
   * identifier and secret
   */
  token: string

  /**
   * An array of abilities the token can perform. The abilities
   * is an array of abritary string values
   */
  abilities: string[]

  /**
   * Timestamp at which the token was used for authentication
   */
  lastUsedAt?: Date
  /**
   * Timestamp at which the token will expire
   */
  expiresAt?: Date
}
