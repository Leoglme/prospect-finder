import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'
import router from '@adonisjs/core/services/router'

/**
 * Swagger YAML output
 */
router.get('/swagger', async (): Promise<any> => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

/**
 * Swagger UI
 */
router.get('/docs', async (): Promise<string> => {
  return AutoSwagger.default.ui('/swagger', swagger)
})
