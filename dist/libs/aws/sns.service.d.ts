export declare class SnsService {
    private client;
    constructor();
    publishMessage<T>(topicArn: string, message: T, subject?: string): Promise<void>;
}
