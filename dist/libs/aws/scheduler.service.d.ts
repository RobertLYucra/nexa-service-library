export declare class EventBridgeSchedulerService {
    private client;
    constructor();
    createOneTimeSchedule(name: string, date: Date, target: {
        arn: string;
        roleArn: string;
        input: string;
        eventBridgeParameters?: {
            DetailType: string;
            Source: string;
        };
    }, description?: string, groupName?: string): Promise<void>;
}
