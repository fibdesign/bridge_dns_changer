export default interface ListOfItemsType<T> {
    data: T[],
    meta: {
        current_page: number,
        from: number,
        last_page: number,
        links: ListMetaLink[],
        path: string,
        per_page: number,
        to: number,
        total: number
    }
}

interface ListMetaLink {
    url: string,
    label: string,
    active: boolean
}