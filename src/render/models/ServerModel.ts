export interface ServerModel {
    id: number,
    title: string,
    description?: string,
    web?: string,
    image: string,
    dns1: string,
    dns2?: string,
    types?: ServerTypes[]
}

export type ServerTypes = 'Gaming' | 'AI' | 'Public'