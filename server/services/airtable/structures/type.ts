

/**
 * Contact interface 
 */
export interface Contact{
    id?: string
    fields: {
        Email: string
        'First name': string
        'Last name': string
        Source: "Website" | "HelloAsso" | "Manual"
        Subcribed: boolean
        "Subcribed Date"?: string
        "HelloAsso Id"?: string
        "Donor Type"?: "Parrain" | "Adoptant" |  "Donateur" | "Supporter"
        Interests? : string[]
        "Last Donation Date"?: string
        Location?: string
        Notes?: string
    }
}