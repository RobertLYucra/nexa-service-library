export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    errors?: ErrorDetail[];
}
export interface ErrorDetail {
    field?: string;
    message: string;
    code?: string;
}
export declare class ResponseUtil {
    static success<T>(message: string, data: T): ApiResponse<T>;
    static error(message: string, errors?: ErrorDetail[]): ApiResponse<null>;
    static validationError(errors: ErrorDetail[]): ApiResponse<null>;
    static singleError(message: string, field?: string, code?: string): ApiResponse<null>;
}
