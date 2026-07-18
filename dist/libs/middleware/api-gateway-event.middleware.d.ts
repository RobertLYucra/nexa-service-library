import { Handler } from 'aws-lambda';
import { ServerlessHandlerConfig } from './interfaces/handler.interface';
export declare class ApiGatewayEventMiddleware {
    private readonly config;
    private cachedServer;
    private cachedApp;
    constructor(config: ServerlessHandlerConfig);
    private bootstrap;
    createHandler(): Handler;
}
