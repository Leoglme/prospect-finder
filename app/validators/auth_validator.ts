import vine from '@vinejs/vine'

/**
 * Validation rules for the login form.
 */
// eslint-disable-next-line @typescript-eslint/typedef
export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().toLowerCase(),
    password: vine.string(),
  })
)
