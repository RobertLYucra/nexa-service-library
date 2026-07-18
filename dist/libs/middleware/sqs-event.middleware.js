"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqsEventMiddleware = void 0;
const core_1 = require("@nestjs/core");
class SqsEventMiddleware {
    constructor(config) {
        this.config = config;
    }
    createHandler(config) {
        return async (event) => {
            console.log('[SQS] Batch Received:', event.Records.length);
            const app = await core_1.NestFactory.create(this.config.appModule);
            if (this.config.appConfigurator) {
                await this.config.appConfigurator(app);
            }
            try {
                const service = app.get(config.service);
                const method = service[config.method];
                await method.apply(service, [event]);
            }
            catch (error) {
                console.error('[SQS] Error:', error.message);
                throw error;
            }
            finally {
                await app.close();
            }
        };
    }
}
exports.SqsEventMiddleware = SqsEventMiddleware;
//# sourceMappingURL=sqs-event.middleware.js.map