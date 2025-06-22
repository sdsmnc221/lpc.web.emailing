import { fakeSubs, Subcription } from '../fake-sub'
import { randomUUID } from "crypto"
/**
 * Handle POST request to add a new subscriber to the fake subscription list
 * @param {any} event - The Nuxt event object containing request data
 * @returns {Promise<any>} Response with the new subscriber data or error message
 */
export default defineEventHandler(async (event) => {
    try {
        // Only allow POST method
        if (event.method !== 'POST') {
            throw createError({
                statusCode: 405,
                statusMessage: 'Method Not Allowed - Only POST requests are accepted'
            });
        }
        
        // Get request body data
        const body = await readBody(event);
        
        // Validate required fields
        if (!body.email) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Email is required'
            });
        }
        
        // Check if email already exists
        const existingSubscriber = fakeSubs.find(sub => sub.email === body.email);
        if (existingSubscriber) {
            throw createError({
                statusCode: 409,
                statusMessage: 'Email already exists in subscription list'
            });
        }
        
        // Generate new ID based on current array length
        const newId = (fakeSubs.length + 1).toString();
        const newUuid = randomUUID();
        // Create new subscriber with data from request body
        const newSubscriber: Subcription = {
            id: newId,
            uuid: newUuid,
            email: body.email,
            name: body.name || '',
            historiesAdoption: body.historiesAdoption ?? false,
            donEtParrainage: body.donEtParrainage ?? false,
            benevolat: body.benevolat ?? false,
            actualites: body.actualites ?? false,
            createdAt: new Date(),
            updateAt: new Date()
        };
        
        // Add to the fake subscription list
        fakeSubs.push(newSubscriber);
        console.log(fakeSubs)
        // Return success response
        return {
            success: true,
            message: 'Subscriber added successfully',
            data: newSubscriber,
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
            statusMessage: 'Internal Server Error: Failed to add subscriber'
        });
    }
});