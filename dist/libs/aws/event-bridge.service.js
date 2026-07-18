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
exports.EventBridgeService = void 0;
const client_eventbridge_1 = require("@aws-sdk/client-eventbridge");
const common_1 = require("@nestjs/common");
let EventBridgeService = class EventBridgeService {
    constructor() {
        this.client = new client_eventbridge_1.EventBridgeClient({ region: process.env.AWS_REGION });
    }
    async sendEvent(source, detailType, detail) {
        const input = {
            Entries: [
                {
                    Source: source,
                    DetailType: detailType,
                    Detail: JSON.stringify(detail),
                    Resources: [],
                },
            ],
        };
        const command = new client_eventbridge_1.PutEventsCommand(input);
        await this.client.send(command);
    }
};
exports.EventBridgeService = EventBridgeService;
exports.EventBridgeService = EventBridgeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EventBridgeService);
//# sourceMappingURL=event-bridge.service.js.map