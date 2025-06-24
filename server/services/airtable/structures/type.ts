

/**
 * Contact class for managing contact data from Airtable
 */
export class Contact {
    id?: string;
    email: string;
    firstName: string;
    lastName: string;
    source: "Website" | "HelloAsso" | "Manual";
    subscribed: boolean;
    subscribedDate?: string;
    helloAssoId?: string;
    donorType?: "Parrain" | "Adoptant" | "Donateur" | "Supporter";
    interests?: string[];
    lastDonationDate?: string;
    location?: string;
    notes?: string;

    constructor(
        email: string,
        firstName: string,
        lastName: string,
        source: "Website" | "HelloAsso" | "Manual",
        subscribed: boolean = false,
        subscribedDate?: string,
        helloAssoId?: string,
        donorType?: "Parrain" | "Adoptant" | "Donateur" | "Supporter",
        interests?: string[],
        lastDonationDate?: string,
        location?: string,
        notes?: string,
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
        this.interests = interests;
        this.lastDonationDate = lastDonationDate;
        this.location = location;
        this.notes = notes;
    }

    static fromRecord(record: any): Contact {
        const data = record.fields || record;
        return new Contact(
            data.Email || '',
            data['First name'] || '',
            data['Last name'] || '',
            data.Source || 'Manual',
            data.Subcribed || false,
            data['Subcribed Date'],
            data['HelloAsso Id'],
            data['Donor Type'],
            data.Interests,
            data['Last Donation Date'],
            data.Location,
            data.Notes,
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
