"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBridgeEventMiddleware = void 0;
const core_1 = require("@nestjs/core");
class EventBridgeEventMiddleware {
    constructor(config) {
        this.config = config;
    }
    createHandler(config) {
        return async (event) => {
            console.log('[EventBridge] Event Received:', JSON.stringify(event, null, 2));
            const app = await core_1.NestFactory.create(this.config.appModule);
            if (this.config.appConfigurator) {
                await this.config.appConfigurator(app);
            }
            try {
                const service = app.get(config.service);
                const method = service[config.method];
                const payload = config.getValue
                    ? config.getValue(event)
                    : event.detail || event;
                const args = Array.isArray(payload) ? payload : [payload];
                await method.apply(service, args);
            }
            catch (error) {
                console.error('[EventBridge] Error:', error.message);
                console.error('[EventBridge] Stack:', error.stack);
                throw error;
            }
            finally {
                await app.close();
            }
        };
    }
    createHandlerWithExtractor(config, extractor) {
        return async (event) => {
            return;
        };
    }
}
exports.EventBridgeEventMiddleware = EventBridgeEventMiddleware;
//# sourceMappingURL=event-bridge-event.middleware.js.map