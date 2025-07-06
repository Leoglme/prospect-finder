/**
 * Service to handle time-related operations, such as creating delays.
 */
export default class TimeService {
  /**
   * Creates a delay for the specified number of milliseconds.
   * @param {number} ms - The number of milliseconds to wait.
   * @returns {Promise<void>} A promise that resolves after the specified delay.
   */
  public static async delay(ms: number): Promise<void> {
    return new Promise(
      (resolve: (value: void | PromiseLike<void>) => void): NodeJS.Timeout =>
        setTimeout(resolve, ms)
    )
  }
}
