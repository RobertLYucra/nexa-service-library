export declare class SqsService {
    private client;
    constructor();
    sendMessage<T>(queueUrl: string, body: T, delaySeconds?: number): Promise<void>;
}
