import AirtableService from "~/server/services/airtable/airtable";

/**
 * Handle PATCH request to update subscriber preferences by UUID
 * @param {any} event - The Nuxt event object containing request data and route parameters
 * @returns {Promise<any>} Response with updated subscriber data or error message
 */
export default defineEventHandler(async (event) => {
    try {
        // Only allow PATCH method
        if (event.method !== 'PATCH') {
            throw createError({
                statusCode: 405,
                statusMessage: 'Method Not Allowed - Only PATCH requests are accepted'
            });
        }
        
        // Get UUID from route parameters
        const uuid = getRouterParam(event, 'uuid');
        const airtableService = AirtableService.getInstance()

        
        // Validate UUID parameter
        if (!uuid) {
            throw createError({
                statusCode: 400,
                statusMessage: 'UUID parameter is required'
            });
        }
        
        // Get request body data
        const body = await readBody(event);
        
        // Find subscriber by UUID
        // const subscriberIndex = fakeSubs.findIndex(sub => sub.uuid === uuid);
        const subId = await airtableService.getSubcriptionId(uuid);
        if(!subId){
            throw createError({
                statusCode: 404,
                statusMessage: 'Subscriber not found with the provided UUID'
            });
        }
        console.log(subId)
        
        // Get current subscriber data
        const subcription = await airtableService.getSubcription(subId);
        // Update only the provided boolean fields directly on the existing object
        if (typeof body.historiesAdoption === 'boolean') {
            subcription.historiesAdoption = Boolean(body.historiesAdoption);
        }
        if (typeof body.donEtParrainage === 'boolean') {
            subcription.donEtParrainage = Boolean(body.donEtParrainage);
        }
        if (typeof body.benevolat === 'boolean') {
            subcription.benevolat = Boolean(body.benevolat);
        }
        if (typeof body.actualites === 'boolean') {
            subcription.actualites = Boolean(body.actualites);
        }
        
        // Update subscription in Airtable
        const result = await airtableService.updateSubcription(subId, subcription);
        console.log(`[${new Date().toISOString()}] Subscription updated successfully:`, result);
        // Return success response
        return {
            success: true,
            message: 'Subscriber preferences updated successfully',
            data: {
                email: subcription.email,
                name: subcription.name,
                historiesAdoption: result.historiesAdoption,
                donEtParrainage: result.donEtParrainage,
                benevolat: result.benevolat,
                actualites: result.actualites
            }
        };
        
    } catch (error) {
        // Handle any errors that occurred
        if ((error as any).statusCode) {
            // Re-throw createError errors
            throw error;
        }
        
        // Handle unexpected errors
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error: Failed to update subscriber preferences'
        });
    }
});