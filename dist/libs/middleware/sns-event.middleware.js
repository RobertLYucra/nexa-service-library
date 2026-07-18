"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnsEventMiddleware = void 0;
const core_1 = require("@nestjs/core");
class SnsEventMiddleware {
    constructor(config) {
        this.config = config;
    }
    createHandler(config) {
        return async (event) => {
            console.log('[SNS] Event Received:', JSON.stringify(event, null, 2));
            const app = await core_1.NestFactory.create(this.config.appModule);
            if (this.config.appConfigurator) {
                await this.config.appConfigurator(app);
            }
            try {
                const service = app.get(config.service);
                const method = service[config.method];
                const payload = config.getValue ? config.getValue(event) : event;
                const args = Array.isArray(payload) ? payload : [payload];
                await method.apply(service, args);
            }
            catch (error) {
                console.error('[SNS] Error:', error.message);
                throw error;
            }
            finally {
                await app.close();
            }
        };
    }
}
exports.SnsEventMiddleware = SnsEventMiddleware;
//# sourceMappingURL=sns-event.middleware.js.map