import AirtableService from "~/server/services/airtable/airtable";

const airtableService = AirtableService.getInstance()


const getMethodHandler =async (event:  any) =>{
    const id = getRouterParam(event, 'id');

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Id parameter is required'
        });
    }
    try{
        const contact = await airtableService.getContactByRecordId(id)
        console.log(contact)
        return {
            ...contact
        }
    }catch(e){
        throw createError({
            statusCode: 500,
            statusMessage: 'INTERNAL SERVER ERROR'
        })
    }

}

export default defineEventHandler(async (event) => {
    if (event.method === 'GET') {
        return await getMethodHandler(event);
    }
})