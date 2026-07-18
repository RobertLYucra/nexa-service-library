import { Handler } from 'aws-lambda';
import { ServerlessHandlerConfig, EventHandlerConfig } from './interfaces/handler.interface';
export declare class SnsEventMiddleware {
    private readonly config;
    constructor(config: ServerlessHandlerConfig);
    createHandler<T = any>(config: EventHandlerConfig<T>): Handler;
}
