"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBridgeSchedulerService = void 0;
const common_1 = require("@nestjs/common");
const client_scheduler_1 = require("@aws-sdk/client-scheduler");
let EventBridgeSchedulerService = class EventBridgeSchedulerService {
    constructor() {
        this.client = new client_scheduler_1.SchedulerClient({
            region: process.env.AWS_REGION,
        });
    }
    async createOneTimeSchedule(name, date, target, description, groupName) {
        const atExpression = `at(${date.toISOString().split('.')[0]})`;
        const params = {
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
                Mode: client_scheduler_1.FlexibleTimeWindowMode.OFF,
            },
            ActionAfterCompletion: client_scheduler_1.ActionAfterCompletion.DELETE,
        };
        if (target.eventBridgeParameters) {
            params.Target.EventBridgeParameters = {
                DetailType: target.eventBridgeParameters.DetailType,
                Source: target.eventBridgeParameters.Source,
            };
        }
        try {
            await this.client.send(new client_scheduler_1.CreateScheduleCommand(params));
        }
        catch (error) {
            console.error('Error creating schedule:', error);
            throw error;
        }
    }
};
exports.EventBridgeSchedulerService = EventBridgeSchedulerService;
exports.EventBridgeSchedulerService = EventBridgeSchedulerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EventBridgeSchedulerService);
//# sourceMappingURL=scheduler.service.js.map