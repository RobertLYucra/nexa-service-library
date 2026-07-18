export declare class EventBridgeService {
    private client;
    constructor();
    sendEvent<T>(source: string, detailType: string, detail: T): Promise<void>;
}
