import Airtable from 'airtable';
import { Contact, PaginatedResponse, PaginationOptions, Subscription } from "./structures/type";

/**
 * Airtable service implementation for managing subscriptions and records
 * Implements singleton pattern for efficient resource management
 */
export class AirtableService {
    private static instance: AirtableService;
    private base: any;
    private isInitalized: boolean = false;

    /**
     * Private constructor to prevent direct instantiation
     */
    private constructor() {}

    /**
     * Get the singleton instance of AirtableService
     * @returns {AirtableService} The singleton instance
     */
    public static getInstance(): AirtableService {
        if (!AirtableService.instance) {
            AirtableService.instance = new AirtableService();
        }
        
        // Auto-initialize if not already initialized
        if (!AirtableService.instance.isInitalized) {
            AirtableService.instance.initialize();
        }
        
        return AirtableService.instance;
    }

    /**
     * Initialize Airtable connection with credentials
     * @throws {Error} If credentials are not configured
     */
    private initialize(): void {
        if (this.isInitalized) {
            return;
        }

        const accessToken = process.env.AIRTABLE_ACCESS_TOKEN;
        const baseId = process.env.AIRTABLE_BASE_ID;

        if (!accessToken || !baseId) {
            throw new Error('Airtable credentials not configured. Please set AIRTABLE_ACCESS_TOKEN and AIRTABLE_BASE_ID environment variables.');
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
    public getTable(tableName: string): any {
        if (!this.isInitalized) {
            throw new Error('AirtableService is not initialized');
        }

        return this.base(tableName);
    }

    /**
     * Get all records from a specific table with pagination support
     * @param {string} tableName - The name of the table
     * @param {PaginationOptions} options - Query options (optional)
     * @returns {Promise<PaginatedResponse<any>>} Promise that resolves to paginated records
     */
    public async getAllRecords(
        tableName: string, 
        options: PaginationOptions = { page: 1, size: 10 }
    ): Promise<PaginatedResponse<any>> {
        try {
            const table = this.base(tableName);
            let totalPage = 0;
            let currentPage = 0;
            let totalItems = 0;
            const allRecords: any[] = [];

            return new Promise((resolve, reject) => {
                table.select({
                    view: "Grid view",
                    pageSize: options.size,
                    ...options
                }).eachPage(
                    function page(records: any, fetchNextPage: any) {
                        totalPage += 1;
                        currentPage += 1;
                        totalItems += records.length;
                        
                        if (currentPage === options.page) {
                            records.forEach(function(record: any) {
                                allRecords.push({
                                    id: record.id,
                                    fields: record.fields
                                });
                            });
                        }
                        
                        fetchNextPage();
                    },
                    function done(err: any) {
                        if (err) {
                            console.error(`[${new Date().toISOString()}] Error fetching records:`, err);
                            reject(new Error(`Failed to fetch records from table '${tableName}': ${err.message || 'Unknown error'}`));
                        } else {
                            const actualTotalPages = Math.ceil(totalItems / (options.size || 10));
                            const hasNext = (options.page || 1) < actualTotalPages;

                            const response: PaginatedResponse<any> = {
                                records: allRecords,
                                pagination: {
                                    page: currentPage,
                                    size: options.size || 10,
                                    total: totalItems,
                                    totalPages: actualTotalPages,
                                    hasNext,
                                    hasPrev: currentPage > 1
                                }
                            };
                            resolve(response);
                        }
                    }
                );
            });
        } catch (error) {
            throw new Error(`Failed to fetch records from table '${tableName}': ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Get all subscription records with pagination
     * @param {number} page - Page number (default: 1)
     * @param {number} size - Page size (default: 10)
     * @returns {Promise<PaginatedResponse<Subscription>>} Promise that resolves to paginated subscriptions
     */
    public async getAllSubscriptions(page: number = 1, size: number = 10): Promise<PaginatedResponse<Subscription>> {
        const subscriptionsRaw = await this.getAllRecords('Subscriptions', { page, size });
        const subList = subscriptionsRaw.records.map((raw) => {
            return Subscription.fromRecord(raw);
        });

        const subscriptions: PaginatedResponse<Subscription> = {
            records: subList,
            pagination: subscriptionsRaw.pagination
        };
        return subscriptions;
    }

    /**
     * Check if an email address already exists in the subscribers table
     * @param {string} email - The email address to check
     * @returns {Promise<boolean>} Promise that resolves to true if email exists, false otherwise
     */
    public async checkEmailSubcriberExists(email: string): Promise<boolean> {
        try {
            const table = this.base("Subscriptions");
            
            return new Promise((resolve, reject) => {
                table.select({
                    filterByFormula: `{Email} = '${email}'`,
                    maxRecords: 1
                }).firstPage((err: any, records: any) => {
                    if (err) {
                        console.error(`[${new Date().toISOString()}] Error checking email existence:`, err);
                        reject(new Error(`Failed to check email existence: ${err.message || 'Unknown error'}`));
                    } else {
                        resolve(records && records.length > 0);
                    }
                });
            });
        } catch (error) {
            throw new Error(`Failed to check email existence: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Add a new subscription to the database
     * @param {Subscription} subscription - The subscription object to add
     * @returns {Promise<void>} Promise that resolves when subscription is created
     */
    public async addNewSubcription(subscription: Subscription): Promise<void> {
        const table = this.base("Subscriptions");
        
        try {
            await new Promise((resolve, reject) => {
                table.create([
                    {
                        "fields": {
                            "Email": subscription.email,
                            "Uuid": subscription.uuid,
                            "Name": subscription.name,
                            "Histories Adoption": subscription.historiesAdoption,
                            "Don Et Parrainage": subscription.donEtParrainage,
                            "Bénévolats": subscription.benevolat,
                            "Actualités": subscription.actualites,
                            "Created At": subscription.createdAt,
                            "Updated At": subscription.updatedAt,
                        }
                    }
                ], function(error: any, records: any) {
                    if (error) {
                        console.error(`[${new Date().toISOString()}] Error creating subscription:`, error);
                        reject(new Error("Failed to create new subscription"));
                    } else {
                        records.forEach(function(record: any) {
                            console.log(`[${new Date().toISOString()}] New subscription created: ${record.id}`);
                        });
                        resolve(records);
                    }
                });
            });
        } catch (error) {
            throw new Error(`Failed to add new subscription: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Update an existing subscription
     * @param {string} recordId - The Airtable record ID
     * @param {Subscription} subscription - The updated subscription data
     * @returns {Promise<Subscription>} Promise that resolves to updated subscription
     */
    public async updateSubcription(recordId: string, subscription: Subscription): Promise<Subscription> {
        try {
            const table = this.base("Subscriptions");
            const updatedSubscription: Subscription = await new Promise((resolve, reject) => {
                table.update([
                    {
                        "id": recordId,
                        "fields": {
                            "Email": subscription.email,
                            "Uuid": subscription.uuid,
                            "Name": subscription.name,
                            "Histories Adoption": subscription.historiesAdoption,
                            "Don Et Parrainage": subscription.donEtParrainage,
                            "Bénévolats": subscription.benevolat,
                            "Actualités": subscription.actualites,
                            "Updated At": new Date().toISOString()
                        }
                    }
                ], function(error: any, records: any) {
                    if (error) {
                        console.error(`[${new Date().toISOString()}] Error updating subscription:`, error);
                        reject(new Error(`Failed to update with record ID ${recordId}`));
                    } else {
                        resolve(Subscription.fromRecord(records[0]));
                    }
                });
            });
            return updatedSubscription;
        } catch (error) {
            throw new Error(`Failed to update subscription record: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Get subscription record ID by UUID
     * @param {string} uuid - The UUID of the subscription to find
     * @returns {Promise<string | null>} The Airtable record ID if found, null otherwise
     */
    public async getSubcriptionId(uuid: string): Promise<string | null> {
        const table = this.base("Subscriptions");
        try {
            return new Promise((resolve, reject) => {
                table.select({
                    filterByFormula: `{Uuid} = '${uuid}'`,
                    maxRecords: 1
                }).firstPage((err: any, records: any) => {
                    if (err) {
                        console.error(`[${new Date().toISOString()}] Error getting subscription ID:`, err);
                        reject(new Error(`Failed to get subscription ID: ${err.message || 'Unknown error'}`));
                    } else {
                        if (records && records.length > 0) {
                            resolve(records[0].id);
                        } else {
                            resolve(null);
                        }
                    }
                });
            });
        } catch (error) {
            throw new Error(`Failed to get subscription ID: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Get a subscription by record ID
     * @param {string} recordId - The Airtable record ID
     * @returns {Promise<Subscription>} Promise that resolves to subscription object
     */
    public async getSubcription(recordId: string): Promise<Subscription> {
        try {
            const table = this.base("Subscriptions");
            const record = await table.find(recordId);
            return Subscription.fromRecord(record);
        } catch (error) {
            throw new Error(`Failed to get subscription record: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }


    public async createNewContact(contact: Contact){
        
    }
}

// Export default for backward compatibility
export default AirtableService;