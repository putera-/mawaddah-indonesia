interface Pagination<T> {
    data: T
    total: number
    page: number
    maxPages: number
    limit: number
}
