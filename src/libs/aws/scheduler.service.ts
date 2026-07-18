import { Injectable } from '@nestjs/common';
import {
  SchedulerClient,
  CreateScheduleCommand,
  CreateScheduleCommandInput,
  FlexibleTimeWindowMode,
  ActionAfterCompletion,
} from '@aws-sdk/client-scheduler';

@Injectable()
export class EventBridgeSchedulerService {
  private client: SchedulerClient;

  constructor() {
    this.client = new SchedulerClient({
      region: process.env.AWS_REGION,
    });
  }

  async createOneTimeSchedule(
    name: string,
    date: Date,
    target: {
      arn: string; // Target ARN (e.g. Lambda ARN or EventBus ARN)
      roleArn: string; // Role that Scheduler assumes
      input: string;
      eventBridgeParameters?: {
        DetailType: string;
        Source: string;
      };
    },
    description?: string,
    groupName?: string,
  ): Promise<void> {
    // Format date to: yyyy-mm-ddThh:mm:ss
    const atExpression = `at(${date.toISOString().split('.')[0]})`;

    const params: CreateScheduleCommandInput = {
      Name: name,
      GroupName: groupName ?? 'default',
      ScheduleExpression: atExpression,
      Description: description,
      Target: {
        Arn: target.arn,
        RoleArn: target.roleArn,
        Input: target.input,
        RetryPolicy: {
          MaximumEventAgeInSeconds: 3600,
          MaximumRetryAttempts: 3,
        },
      },
      FlexibleTimeWindow: {
        Mode: FlexibleTimeWindowMode.OFF,
      },
      ActionAfterCompletion: ActionAfterCompletion.DELETE,
    };

    if (target.eventBridgeParameters) {
      params.Target!.EventBridgeParameters = {
        DetailType: target.eventBridgeParameters.DetailType,
        Source: target.eventBridgeParameters.Source,
      };
    }

    try {
      await this.client.send(new CreateScheduleCommand(params));
    } catch (error) {
      console.error('Error creating schedule:', error);
      throw error;
    }
  }
}
