import type { CreateProspectPayload, UpdateProspectPayload } from '#interfaces/prospect_interface'
import Prospect from '#models/prospect'

/**
 * Service to handle prospect operations
 * @class ProspectService
 */
export default class ProspectService {
  /**
   * Create multiple prospects using promise resolve all
   * @param {CreateProspectPayload[]} payloads - Array of data to create prospects
   * @returns {Promise<Prospect[]>} - A promise that resolves with the created prospects
   */
  public static async createProspects(payloads: CreateProspectPayload[]): Promise<Prospect[]> {
    try {
      const promises: Promise<Prospect>[] = payloads.map((payload: CreateProspectPayload): Promise<Prospect> => this.createProspect(payload))
      return await Promise.all(promises)
    } catch (error: any) {
      console.error(error)
      throw error
    }
  }

  /**
   * Create a new prospect
   * @param {CreateProspectPayload} payload - Data to create the prospect
   * @returns {Promise<Prospect>} - A promise that resolves with the created prospect
   */
  public static async createProspect(payload: CreateProspectPayload): Promise<Prospect> {
    try {
      if (payload.email) {
        const existingProspect: Prospect | null = await this.findProspectByEmail(payload.email)
        if (existingProspect) {
          throw new Error('Prospect with this email already exists')
        }
      }
      return await Prospect.create(payload)
    } catch (error: any) {
      console.error(error)
      throw error
    }
  }

  /**
   * Get all prospects
   * @returns {Promise<Prospect[]>} - A promise that resolves with an array of prospects
   */
  public static async getProspects(): Promise<Prospect[]> {
    try {
      return await Prospect.all()
    } catch (error: any) {
      console.error(error)
      throw error
    }
  }

  /**
   * Get a prospect by ID
   * @param {number} id - The prospect ID
   * @returns {Promise<Prospect>} - A promise that resolves with the prospect
   */
  public static async getProspectById(id: number): Promise<Prospect> {
    try {
      return await Prospect.findOrFail(id)
    } catch (error: any) {
      console.error(error)
      throw error
    }
  }

  /**
   * Update a prospect
   * @param {number} id - The prospect ID
   * @param {UpdateProspectPayload} payload - The data to update the prospect
   * @returns {Promise<Prospect>} - A promise that resolves with the updated prospect
   */
  public static async updateProspect(id: number, payload: UpdateProspectPayload): Promise<Prospect> {
    try {
      const prospect = await ProspectService.getProspectById(id)
      if (payload.email && payload.email !== prospect.email) {
        const existingProspect: Prospect | null = await this.findProspectByEmail(payload.email)
        if (existingProspect) {
          throw new Error('Prospect with this email already exists')
        }
      }
      await prospect.merge(payload).save()
      await prospect.refresh()
      return prospect
    } catch (error: any) {
      console.error(error)
      throw error
    }
  }

  /**
   * Find a prospect by email
   * @param {string} email - The prospect email
   * @returns {Promise<Prospect | null>} - A promise that resolves with the prospect or null if not found
   */
  public static async findProspectByEmail(email: string | null): Promise<Prospect | null> {
    try {
      if (!email) return null
      return await Prospect.query().where('email', email).first()
    } catch (error: any) {
      console.error(error)
      throw error
    }
  }

  /**
   * Find prospects by osm_id
   * @param {number} osm_id - The OpenStreetMap ID of the prospect
   * @returns {Promise<Prospect | null>} - A promise that resolves with the prospect or null if not found
   */
  public static async findProspectByOsmId(osm_id: number): Promise<Prospect | null> {
    try {
      return await Prospect.query().where('osm_id', osm_id).first()
    } catch (error: any) {
      console.error(error)
      throw error
    }
  }

  /**
   * Find prospects to contact (no website, has email, not contacted)
   * @returns {Promise<Prospect[]>} - A promise that resolves with an array of prospects to contact
   */
  public static async findProspectsToContact(): Promise<Prospect[]> {
    try {
      return await Prospect.query()
        .where('has_website', false)
        .whereNotNull('email')
        .where('contacted', false)
    } catch (error: any) {
      console.error(error)
      throw error
    }
  }
}
