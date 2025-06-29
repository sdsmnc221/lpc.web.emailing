

/**
 * Contact class for managing contact data from Airtable
 */
export class Contact {
    id?: string;
    email: string;
    firstName?: string;
    lastName?: string;
    source?: "Website" | "HelloAsso" | "Manual";
    subscribed: boolean;
    subscribedDate?: string;
    helloAssoId?: string;
    donorType?: "Parrain" | "Adoptant" | "Donateur" | "Supporter";
    lastDonation: number;
    totalDonations: number;
    lastDonationDate?: string;
    location?: string;
    phone?: string;
    createdAt?: string;
    updatedAt?: string;

    constructor(
        email: string,
        subscribed: boolean = false,
        lastDonation: number = 0,
        totalDonations: number = 0,
        firstName?: string,
        lastName?: string,
        source?: "Website" | "HelloAsso" | "Manual",
        subscribedDate?: string,
        helloAssoId?: string,
        donorType?: "Parrain" | "Adoptant" | "Donateur" | "Supporter",
        lastDonationDate?: string,
        location?: string,
        phone?: string,
        createdAt: string = new Date().toISOString(),
        updatedAt: string = new Date().toISOString(),
        id?: string
    ) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.source = source;
        this.subscribed = subscribed;
        this.subscribedDate = subscribedDate;
        this.helloAssoId = helloAssoId;
        this.donorType = donorType;
        this.lastDonation = lastDonation;
        this.totalDonations = totalDonations;
        this.lastDonationDate = lastDonationDate;
        this.location = location;
        this.phone = phone;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

     /**
     * Create a Contact instance from Airtable record
     * @param {any} record - Raw Airtable record with id and fields
     * @returns {Contact} Converted contact object
     */
     static fromRecord(record: any): Contact {
        const data = record.fields || record;
        return new Contact(
            data.Email || '',
            data.Subscribed || false,
            data['Last Donation'] || 0,
            data['Total Donations'] || 0,
            data['First Name'],
            data['Last Name'],
            data.Source,
            data['Subscribed Date'],
            data['HelloAsso ID'],
            data['Donor Type'],
            data['Last Donation Date'],
            data.Location,
            data.Phone,
            data['Created At'] || new Date().toISOString(),
            data['Updated At'] || new Date().toISOString(),
            record.id
        );
    }
}

export class Subscription {
    id?: string
    email: string
    name: string
    uuid: string
    historiesAdoption: boolean
    donEtParrainage: boolean
    benevolat: boolean
    actualites: boolean
    createdAt: string
    updatedAt: string

    constructor(
        email: string,
        name: string,
        uuid: string,
        historiesAdoption: boolean = false,
        donEtParrainage: boolean = false,
        benevolat: boolean = false,
        actualites: boolean = false,
        createdAt: string = new Date().toISOString(),
        updatedAt: string = new Date().toISOString(),
        id?: string
    ) {
        this.id = id
        this.email = email
        this.name = name
        this.uuid = uuid
        this.historiesAdoption = historiesAdoption
        this.donEtParrainage = donEtParrainage
        this.benevolat = benevolat
        this.actualites = actualites
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    /**
     * Create a Subscription instance from Airtable record
     * @param {any} record - Raw Airtable record with id and fields
     * @returns {Subscription} Converted subscription object
     */
    static fromRecord(record: any): Subscription {
        const data = record.fields || record
        return new Subscription(
            data.Email || '',
            data.Name || '',
            data.Uuid || '',
            data['Histories Adoption'] || false,
            data['Don Et Parrainage'] || false,
            data['Bénévolats'] || false,
            data['Actualités'] || false,
            data['Created At'] || new Date().toISOString(),
            data['Updated At'] || new Date().toISOString(),
            record.id
        )
    }
}


export interface PaginationOptions {
    page: number
    size: number
    sort?: Array<{field: string, direction: 'asc' | 'desc'}>
}

export interface PaginatedResponse<T> {
    records: T[]
    pagination: {
        page: number
        size: number
        total: number
        totalPages: number
        hasNext: boolean
        hasPrev: boolean
    }
}
