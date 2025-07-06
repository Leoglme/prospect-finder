import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const HealthController = () => import('#controllers/health_controller')

/**
 * Verify the health of the application
 */
router.get('/health', [HealthController, 'healthCheck']).use(middleware.health())
