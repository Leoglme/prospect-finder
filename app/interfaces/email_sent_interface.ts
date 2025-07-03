/**
 * Interface for creating an email sent record
 */
export interface CreateEmailSentPayload {
  prospect_id: number
  mailjet_id: string
  status?: string | null
}

/**
 * Interface for updating an email sent record
 */
export interface UpdateEmailSentPayload {
  status?: string | null
}
