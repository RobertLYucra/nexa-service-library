"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsModule = void 0;
const common_1 = require("@nestjs/common");
const s3_service_1 = require("./s3.service");
const event_bridge_service_1 = require("./event-bridge.service");
const sqs_service_1 = require("./sqs.service");
const sns_service_1 = require("./sns.service");
const lambda_client_service_1 = require("./lambda-client.service");
const scheduler_service_1 = require("./scheduler.service");
let AwsModule = class AwsModule {
};
exports.AwsModule = AwsModule;
exports.AwsModule = AwsModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            s3_service_1.S3Service,
            event_bridge_service_1.EventBridgeService,
            sqs_service_1.SqsService,
            sns_service_1.SnsService,
            lambda_client_service_1.LambdaClientService,
            scheduler_service_1.EventBridgeSchedulerService,
        ],
        exports: [
            s3_service_1.S3Service,
            event_bridge_service_1.EventBridgeService,
            sqs_service_1.SqsService,
            sns_service_1.SnsService,
            lambda_client_service_1.LambdaClientService,
            scheduler_service_1.EventBridgeSchedulerService,
        ],
    })
], AwsModule);
//# sourceMappingURL=aws.module.js.map