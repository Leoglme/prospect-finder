/**
 * Debugging information for the health check
 */
export interface HealthCheckDebugInfo {
  /**
   * The process id
   */
  pid: number
  /**
   * The process id for the parent process (if any)
   */
  ppid?: number
  /**
   * The number of seconds for which the process has been
   * running.
   */
  uptime: number
  /**
   * Node.js version
   */
  version: string
  /**
   * The platform on which the application is running
   */
  platform: string
}

/**
 * Health check interface
 */
export interface HealthCheck {
  /**
   * Is the check cached
   */
  isCached: boolean
  /**
   * The name of the check
   */
  name: string

  /**
   * A summary of the check result
   */
  message: string
  /**
   * The status of the check.
   */
  status: string
  /**
   * Date/time when this check was completed
   */
  finishedAt: Date
}

/**
 *  Health check report response interface
 */
export interface HealthCheckReportResponse {
  /**
   * Is the entire report healthy. The value will be set to
   * false when one or more of the checks has a status or
   * "error"
   */
  isHealthy: boolean
  /**
   * Status of the entire report.
   *
   * - Set to "ok" when all checks have ok status
   * - Set to "warning" when one or more checks have warning status
   * - Set to "error" when one or more checks have error status
   */
  status: string
  /**
   * The date/time when the entire report was computed
   */
  finishedAt: Date
  /**
   * The debugging info for the running process
   */
  debugInfo: HealthCheckDebugInfo
  /**
   * Perform checks and their report
   */
  checks: HealthCheck[]
}
