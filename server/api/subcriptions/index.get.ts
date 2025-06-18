import { fakeSubs } from './fake-sub'

/**
 * GET endpoint to retrieve all subscribers
 * @returns {Object} Response object containing all subscribers
 * @throws {Error} Returns 500 status code if an error occurs
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

    // Return all subscribers with success status
    return {
      success: true,
      data: fakeSubs,
      total: fakeSubs.length,
      message: 'Subscribers retrieved successfully'
    }
  } catch (error: any) {
    // Handle any errors that occur during processing
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error',
      data: {
        success: false,
        message: error.message || 'Failed to retrieve subscribers'
      }
    })
  }
})