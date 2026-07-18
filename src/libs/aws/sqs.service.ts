import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SqsService {
  private client: SQSClient;

  constructor() {
    this.client = new SQSClient({ region: process.env.AWS_REGION });
  }

  async sendMessage<T>(
    queueUrl: string,
    body: T,
    delaySeconds: number = 0,
  ): Promise<void> {
    if (
      !queueUrl ||
      (!queueUrl.startsWith('https://') && !queueUrl.startsWith('http://'))
    ) {
      console.warn(
        `[SqsService] Invalid Queue URL: '${queueUrl}'. Skipping message send.`,
      );
      return;
    }

    const command = new SendMessageCommand({
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(body),
      DelaySeconds: delaySeconds,
    });

    await this.client.send(command);
  }
}
