import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SnsService {
  private client: SNSClient;

  constructor() {
    this.client = new SNSClient({ region: process.env.AWS_REGION });
  }

  async publishMessage<T>(
    topicArn: string,
    message: T,
    subject?: string,
  ): Promise<void> {
    const command = new PublishCommand({
      TopicArn: topicArn,
      Message: JSON.stringify(message),
      Subject: subject,
    });

    await this.client.send(command);
  }
}
