import { Handler } from 'aws-lambda';
import { ServerlessHandlerConfig, EventHandlerConfig, IServerlessHandler } from './interfaces/handler.interface';
export declare class ServerlessHandler implements IServerlessHandler {
    private readonly config;
    constructor(config: ServerlessHandlerConfig);
    private configureDefaultApp;
    createHttpHandler(): Handler;
    createEventBridgeHandler<T = any>(config: EventHandlerConfig<T>): Handler;
    createSqsHandler<T = any>(config: EventHandlerConfig<T>): Handler;
    createSnsHandler<T = any>(config: EventHandlerConfig<T>): Handler;
}
