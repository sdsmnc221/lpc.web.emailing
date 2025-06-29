import { randomUUID } from "crypto"
import AirtableService from "~/server/services/airtable/airtable";
import { Subscription } from "~/server/services/airtable/structures/type";
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
        const airtableService = AirtableService.getInstance()

        const body = await readBody(event);
        
        // Validate required fields
        if (!body.email) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Email is required'
            });
        }

        // validate if email already subcribe
        if (await airtableService.checkEmailSubcriberExists(body.email)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Email already subcribed'
            });
        }

        // create new subscription
        const newSubcription = new Subscription(
            body.email, 
            body.name || "",
            randomUUID(),
            body.historiesAdoption || false,
            body.donEtParrainage || false,
            body.benevolat || false,
            body.actualites || false,
            new Date().toISOString(),
            new Date().toISOString(),
        )

        // add new subcription
        try {
            await airtableService.addNewSubcription(newSubcription)
        } catch (error) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Internal Server Error: Failed to add subscriber'
            });
        }
        
        // Return success response
        return {
            success: true,
            message: 'Subscriber added successfully',
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