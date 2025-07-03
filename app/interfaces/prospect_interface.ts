/**
 * Interface for creating a prospect
 */
export interface CreateProspectPayload {
  name?: string | null
  category?: string | null
  email?: string | null
  phone?: string | null
  website?: string | null
  address?: string | null
  postcode?: string | null
  city?: string | null
  latitude?: number | null
  longitude?: number | null
  has_website?: boolean
  email_validated?: boolean
  contacted?: boolean
}

/**
 * Interface for updating a prospect
 */
export interface UpdateProspectPayload {
  name?: string | null
  category?: string | null
  email?: string | null
  phone?: string | null
  website?: string | null
  address?: string | null
  postcode?: string | null
  city?: string | null
  latitude?: number | null
  longitude?: number | null
  has_website?: boolean
  email_validated?: boolean
  contacted?: boolean
}
