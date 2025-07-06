import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')

/**
 * Route to handle user sign-in
 */
router.post('/auth-sign-in', [AuthController, 'signIn'])

/**
 * Route to find authenticated user
 */
router.get('/me', [AuthController, 'me']).use(middleware.auth())
