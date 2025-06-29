import AirtableService from "~/server/services/airtable/airtable"

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
      const contacts = await airtableService.getAllContacts(1, 2)
      // Return all subscribers with success status
      return {
        ...contacts
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