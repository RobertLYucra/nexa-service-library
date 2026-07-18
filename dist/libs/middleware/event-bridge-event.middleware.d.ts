import { Handler } from 'aws-lambda';
import { ServerlessHandlerConfig, EventHandlerConfig } from './interfaces/handler.interface';
export declare class EventBridgeEventMiddleware {
    private readonly config;
    constructor(config: ServerlessHandlerConfig);
    createHandler<T = any>(config: EventHandlerConfig<T> & {
        getValue?: (event: any) => any;
    }): Handler;
    createHandlerWithExtractor<T = any>(config: EventHandlerConfig<T>, extractor: (event: any) => any): Handler;
}
