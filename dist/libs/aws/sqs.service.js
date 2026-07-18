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
exports.SqsService = void 0;
const client_sqs_1 = require("@aws-sdk/client-sqs");
const common_1 = require("@nestjs/common");
let SqsService = class SqsService {
    constructor() {
        this.client = new client_sqs_1.SQSClient({ region: process.env.AWS_REGION });
    }
    async sendMessage(queueUrl, body, delaySeconds = 0) {
        if (!queueUrl ||
            (!queueUrl.startsWith('https://') && !queueUrl.startsWith('http://'))) {
            console.warn(`[SqsService] Invalid Queue URL: '${queueUrl}'. Skipping message send.`);
            return;
        }
        const command = new client_sqs_1.SendMessageCommand({
            QueueUrl: queueUrl,
            MessageBody: JSON.stringify(body),
            DelaySeconds: delaySeconds,
        });
        await this.client.send(command);
    }
};
exports.SqsService = SqsService;
exports.SqsService = SqsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SqsService);
//# sourceMappingURL=sqs.service.js.map