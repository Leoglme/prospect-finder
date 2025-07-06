import logger from '@adonisjs/core/services/logger'
import type { CreateEmailSentPayload, UpdateEmailSentPayload } from '#interfaces/email_sent_interface'
import EmailSent from '#models/emails_sent'
/**
 * Service to handle email sent operations
 * @class EmailSentService
 */
export default class EmailSentService {
  /**
   * Create a new email sent record
   * @param {CreateEmailSentPayload} payload - Data to create the email sent record
   * @returns {Promise<EmailSent>} - A promise that resolves with the created email sent record
   */
  public static async createEmailSent(payload: CreateEmailSentPayload): Promise<EmailSent> {
    try {
      return await EmailSent.create(payload)
    } catch (error: any) {
      logger.error(error)
      throw error
    }
  }

  /**
   * Get all email sent records
   * @returns {Promise<EmailSent[]>} - A promise that resolves with an array of email sent records
   */
  public static async getEmailsSent(): Promise<EmailSent[]> {
    try {
      return await EmailSent.all()
    } catch (error: any) {
      logger.error(error)
      throw error
    }
  }

  /**
   * Get an email sent record by ID
   * @param {number} id - The email sent record ID
   * @returns {Promise<EmailSent>} - A promise that resolves with the email sent record
   */
  public static async getEmailSentById(id: number): Promise<EmailSent> {
    try {
      return await EmailSent.findOrFail(id)
    } catch (error: any) {
      logger.error(error)
      throw error
    }
  }

  /**
   * Update an email sent record
   * @param {number} id - The email sent record ID
   * @param {UpdateEmailSentPayload} payload - The data to update the email sent record
   * @returns {Promise<EmailSent>} - A promise that resolves with the updated email sent record
   */
  public static async updateEmailSent(id: number, payload: UpdateEmailSentPayload): Promise<EmailSent> {
    try {
      const emailSent = await EmailSentService.getEmailSentById(id)
      await emailSent.merge(payload).save()
      await emailSent.refresh()
      return emailSent
    } catch (error: any) {
      logger.error(error)
      throw error
    }
  }
}
