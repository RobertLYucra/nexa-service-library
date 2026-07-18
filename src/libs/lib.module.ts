import { Module } from '@nestjs/common';
import { AwsModule } from './aws/aws.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, AwsModule],
  exports: [DatabaseModule, AwsModule],
})
export class LibModule {}
