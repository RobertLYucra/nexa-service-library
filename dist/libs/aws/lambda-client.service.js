"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LambdaClientService = void 0;
const common_1 = require("@nestjs/common");
const client_lambda_1 = require("@aws-sdk/client-lambda");
const api_exception_1 = require("../exceptions/api.exception");
let LambdaClientService = class LambdaClientService {
    constructor() {
        this.client = new client_lambda_1.LambdaClient({
            region: process.env.AWS_REGION || 'us-east-2',
        });
    }
    async invoke(functionName, payload) {
        const command = new client_lambda_1.InvokeCommand({
            FunctionName: functionName,
            InvocationType: 'RequestResponse',
            Payload: JSON.stringify(payload),
        });
        try {
            const response = await this.client.send(command);
            if (response.FunctionError) {
                const errorPayload = response.Payload
                    ? JSON.parse(new TextDecoder().decode(response.Payload))
                    : { message: 'Unknown error' };
                throw api_exception_1.ApiException.internalServerError(`Lambda invocation failed: ${response.FunctionError} - ${JSON.stringify(errorPayload)}`);
            }
            const result = JSON.parse(new TextDecoder().decode(response.Payload));
            return result;
        }
        catch (error) {
            if (error instanceof api_exception_1.ApiException)
                throw error;
            throw api_exception_1.ApiException.internalServerError(`Failed to invoke lambda ${functionName}: ${error.message}`);
        }
    }
    async invokeHttp(functionName, request) {
        const event = {
            httpMethod: request.method,
            path: request.path,
            resource: request.path,
            headers: {
                'Content-Type': 'application/json',
                'X-Lambda-Invoke': 'true',
                ...request.headers,
            },
            queryStringParameters: request.queryStringParameters || null,
            multiValueQueryStringParameters: request.queryStringParameters
                ? Object.keys(request.queryStringParameters).reduce((acc, key) => {
                    acc[key] = [request.queryStringParameters[key]];
                    return acc;
                }, {})
                : null,
            pathParameters: request.pathParameters || null,
            body: request.body ? JSON.stringify(request.body) : null,
            requestContext: {
                httpMethod: request.method,
                resourcePath: request.path,
                path: request.path,
                identity: { sourceIp: '127.0.0.1' },
            },
        };
        const result = await this.invoke(functionName, event);
        if (result && typeof result.statusCode === 'number') {
            let body = result.body;
            try {
                if (typeof body === 'string') {
                    body = JSON.parse(body);
                }
            }
            catch (e) {
            }
            if (result.statusCode >= 400) {
                const remoteMessage = body?.message || JSON.stringify(body);
                switch (result.statusCode) {
                    case 400:
                        throw api_exception_1.ApiException.badRequest(remoteMessage);
                    case 401:
                        throw api_exception_1.ApiException.unauthorized(remoteMessage);
                    case 403:
                        throw api_exception_1.ApiException.forbidden(remoteMessage);
                    case 404:
                        throw api_exception_1.ApiException.notFound(remoteMessage, undefined, 'INVOKE_NOT_FOUND');
                    case 409:
                        throw api_exception_1.ApiException.conflict(remoteMessage, undefined, 'INVOKE_CONFLICT');
                    default:
                        throw api_exception_1.ApiException.internalServerError(remoteMessage || `Status ${result.statusCode}`);
                }
            }
            return body?.data !== undefined ? body.data : body;
        }
        return result?.data !== undefined ? result.data : result;
    }
    async get(functionName, path, queryParams) {
        const stringParams = queryParams
            ? Object.entries(queryParams).reduce((acc, [key, value]) => {
                acc[key] = String(value);
                return acc;
            }, {})
            : undefined;
        return this.invokeHttp(functionName, {
            method: 'GET',
            path,
            queryStringParameters: stringParams,
        });
    }
    async post(functionName, path, body) {
        return this.invokeHttp(functionName, {
            method: 'POST',
            path,
            body,
        });
    }
    async put(functionName, path, body) {
        return this.invokeHttp(functionName, {
            method: 'PUT',
            path,
            body,
        });
    }
    async delete(functionName, path) {
        return this.invokeHttp(functionName, {
            method: 'DELETE',
            path,
        });
    }
};
exports.LambdaClientService = LambdaClientService;
exports.LambdaClientService = LambdaClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LambdaClientService);
//# sourceMappingURL=lambda-client.service.js.map