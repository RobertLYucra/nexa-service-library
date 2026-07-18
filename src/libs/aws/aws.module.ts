import { Module, Global } from '@nestjs/common';
import { S3Service } from './s3.service';
import { EventBridgeService } from './event-bridge.service';
import { SqsService } from './sqs.service';
import { SnsService } from './sns.service';
import { LambdaClientService } from './lambda-client.service';
import { EventBridgeSchedulerService } from './scheduler.service';

@Global()
@Module({
  providers: [
    S3Service,
    EventBridgeService,
    SqsService,
    SnsService,
    LambdaClientService,
    EventBridgeSchedulerService,
  ],
  exports: [
    S3Service,
    EventBridgeService,
    SqsService,
    SnsService,
    LambdaClientService,
    EventBridgeSchedulerService,
  ],
})
export class AwsModule {}
