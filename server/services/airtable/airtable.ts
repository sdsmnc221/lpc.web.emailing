import Airtable, { Table } from "airtable";


export default class AirtableService{
    private static instance: AirtableService;
    private base: any;
    private isInitalized: boolean = false;

    /**
    * Private constructor to prevent direct instantiation
    */
    private constructor(){}

    /**
    * Get the singleton instance of AirtableService
    * @returns {AirtableService} The singleton instance
    */
    public static getInstance(): AirtableService{
        if (!AirtableService.instance) {
            AirtableService.instance = new AirtableService()
        }
        
        // Auto-initialize if not already initialized
        if (!AirtableService.instance.isInitalized) {
            AirtableService.instance.initialize()
        }
        
        return AirtableService.instance
    }

    /**
    * Initialize Airtable connection with credentials
    * @throws {Error} If credentials are not configured
    */
    private initialize(){
        if (this.isInitalized){
            return;
        }

        const accessToken = process.env.AIRTABLE_ACCESS_TOKEN;
        const baseId = process.env.AIRTABLE_BASE_ID;

        if (!accessToken || !baseId) {
            throw new Error('Airtable credentials not configured. Please set AIRTABLE_API_KEY and AIRTABLE_BASE_ID environment variables.')
        }

        Airtable.configure({
            apiKey: accessToken
        });
        this.base = Airtable.base(baseId);
        this.isInitalized = true;
    }

    /**
    * Get a specific table from the base
    * @param {string} tableName - The name of the table to retrieve
    * @returns {any} The Airtable table instance
    */
    public getTable(tableName: string) {
        if (!this.isInitalized) {
            throw new Error('AirtableService is not initialized')
        }

        return this.base(tableName)
    }


    /**
    * Get all records from a specific table
    * @param {string} tableName - The name of the table
    * @param {object} options - Query options (optional)
    * @returns {Promise<any[]>} Promise that resolves to array of records
    */
    public async getAllRecords(tableName: string, options: any = {}): Promise<any[]> {
        try {
            const table = this.getTable(tableName)
            const records = await table.select(options).all()
            return records
        } catch (error) {
            throw new Error(`Failed to fetch records from table '${tableName}': ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}