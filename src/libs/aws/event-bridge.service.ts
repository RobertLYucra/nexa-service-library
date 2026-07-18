import {
  EventBridgeClient,
  PutEventsCommand,
  PutEventsCommandInput,
} from '@aws-sdk/client-eventbridge';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventBridgeService {
  private client: EventBridgeClient;

  constructor() {
    this.client = new EventBridgeClient({ region: process.env.AWS_REGION });
  }

  async sendEvent<T>(
    source: string,
    detailType: string,
    detail: T,
  ): Promise<void> {
    const input: PutEventsCommandInput = {
      Entries: [
        {
          Source: source,
          DetailType: detailType,
          Detail: JSON.stringify(detail),
          Resources: [],
        },
      ],
    };

    const command = new PutEventsCommand(input);
    await this.client.send(command);
  }
}
