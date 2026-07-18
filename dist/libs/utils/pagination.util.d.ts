export interface PaginationMetadata {
    total: number;
    page: number;
    perPage: number;
    hasNext: boolean;
    hasPrev: boolean;
    to: number;
    from: number;
}
export interface PaginatedResponse<T> {
    items: T[];
    pagination: PaginationMetadata;
}
export declare function PaginationUtil(total: number, page: number, perPage: number): PaginationMetadata;
