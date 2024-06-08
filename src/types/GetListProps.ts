import type { IdType } from '@/types/IdType'

export default interface GetListProps {
    page?: number,
    pageSize?: number,
    category?: IdType,
    categoryId?: IdType,
    sort?: IdType,
}