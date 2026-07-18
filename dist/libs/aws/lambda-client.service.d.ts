export interface LambdaHttpRequest {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    path: string;
    pathParameters?: Record<string, string>;
    queryStringParameters?: Record<string, string>;
    body?: any;
    headers?: Record<string, string>;
}
export declare class LambdaClientService {
    private client;
    constructor();
    invoke(functionName: string, payload: any): Promise<any>;
    invokeHttp(functionName: string, request: LambdaHttpRequest): Promise<any>;
    get(functionName: string, path: string, queryParams?: Record<string, any>): Promise<any>;
    post(functionName: string, path: string, body: any): Promise<any>;
    put(functionName: string, path: string, body: any): Promise<any>;
    delete(functionName: string, path: string): Promise<any>;
}
