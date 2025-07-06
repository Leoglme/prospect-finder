import { healthChecks } from '#start/health'
import type { HttpContext } from '@adonisjs/core/http'
import type {HealthCheckReportResponse} from "#interfaces/health_interface";

/**
 * Health checks controller
 * @class HealthController
 */
export default class HealthController {
  /**
   * Handle the request
   * @param {HttpContext} ctx - The HTTP context
   * @returns {Promise<void>}
   */
  /**
   * @healthCheck
   * @operationId healthCheck
   * @tag Health
   * @summary Health check endpoint
   * @description This endpoint performs health checks on the application and returns a report indicating whether the application is healthy or not.
   * @content application/json
   * @responseBody 201 - <HealthCheckReportResponse>
   * @responseBody 503 - <HealthCheckReportResponse>
   */
  public async healthCheck({ response }: HttpContext): Promise<void> {
    // Run the health checks
    const report: HealthCheckReportResponse = await healthChecks.run()

    // Return the report with a 200 status code if the application is healthy
    if (report.isHealthy) {
      response.ok(report)
    }

    // Return the report with a 503 status code if the application is unhealthy
    response.serviceUnavailable(report)
  }
}
