import AirtableService from '~/server/services/airtable/airtable'
import { Subscription } from '~/server/services/airtable/structures/type'

/**
 * GET endpoint to retrieve all subscription records from Airtable
 * @returns {Promise<Object>} Response object containing subscription data
 */
export default defineEventHandler(async (event) => {
  try {
    // Validate HTTP method
    if (event.method !== 'GET') {
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed. Only GET requests are supported.'
      })
    }

    // Get AirtableService instance
    const airtableService = AirtableService.getInstance()
    // Fetch all subscription records from Airtable
    const subcriptions = await airtableService.getAllSubscriptions(1, 2)
    // Return all subscribers with success status
    return {
      ...subcriptions
    }
  } catch (error: any) {
    // Handle any errors that occur during processing
    console.error('Error retrieving subscriptions:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error',
      data: {
        success: false,
        message: error.message || 'Failed to retrieve subscribers from Airtable'
      }
    })
  }
})