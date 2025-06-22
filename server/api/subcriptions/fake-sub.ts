



export const fakeSubs = [
    {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        uuid:"96812259-AEEF-47A5-9607-8AF860ADFE95",
        historiesAdoption: true,
        donEtParrainage: false,
        benevolat: true,
        actualites: true,
        createdAt: new Date(),
        updateAt: new Date()
    },
    { id: '2',
        email: 'quangdung0609@gmail.com',
        name: 'Test User',
        uuid: "87582A55-503B-444A-8957-6B8D8A4827D9",
        historiesAdoption: true,
        donEtParrainage: false,
        benevolat: true,
        actualites: true,
        createdAt: new Date(),
        updateAt: new Date()
    }
]


export interface Subcription {
    id: string
    uuid: string
    email: string
    name: string
    historiesAdoption: boolean
    donEtParrainage: boolean
    benevolat: boolean
    actualites: boolean
    createdAt: Date
    updateAt: Date
}