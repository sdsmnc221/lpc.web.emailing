import { fakeSubs } from '../fake-sub'

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
        const subscriberIndex = fakeSubs.findIndex(sub => sub.uuid === uuid);
        
        // Check if subscriber exists
        if (subscriberIndex === -1) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Subscriber not found with the provided UUID'
            });
        }
        
        // Get current subscriber data
        const currentSubscriber = fakeSubs[subscriberIndex];
        
        // Update only the provided boolean fields
        const updatedSubscriber = {
            ...currentSubscriber,
            // Update historiesAdoption if provided
            ...(typeof body.historiesAdoption === 'boolean' && { historiesAdoption: body.historiesAdoption }),
            // Update donEtParrainage if provided
            ...(typeof body.donEtParrainage === 'boolean' && { donEtParrainage: body.donEtParrainage }),
            // Update benevolat if provided
            ...(typeof body.benevolat === 'boolean' && { benevolat: body.benevolat }),
            // Update actualites if provided
            ...(typeof body.actualites === 'boolean' && { actualites: body.actualites }),
            // Update timestamp
            updateAt: new Date()
        };
        
        // Replace the subscriber in the array
        fakeSubs[subscriberIndex] = updatedSubscriber;
        
        // Return success response
        return {
            success: true,
            message: 'Subscriber preferences updated successfully',
            data: {
                updatedSubscriber,
                updatedFields: {
                    ...(typeof body.historiesAdoption === 'boolean' && { historiesAdoption: body.historiesAdoption }),
                    ...(typeof body.donEtParrainage === 'boolean' && { donEtParrainage: body.donEtParrainage }),
                    ...(typeof body.benevolat === 'boolean' && { benevolat: body.benevolat }),
                    ...(typeof body.actualites === 'boolean' && { actualites: body.actualites })
                }
            },
            total: fakeSubs.length
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