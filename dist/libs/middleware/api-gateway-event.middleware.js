"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGatewayEventMiddleware = void 0;
const serverless_express_1 = require("@codegenie/serverless-express");
const core_1 = require("@nestjs/core");
class ApiGatewayEventMiddleware {
    constructor(config) {
        this.config = config;
    }
    async bootstrap() {
        if (!this.cachedApp) {
            this.cachedApp = await core_1.NestFactory.create(this.config.appModule);
            if (this.config.appConfigurator) {
                await this.config.appConfigurator(this.cachedApp);
            }
            await this.cachedApp.init();
        }
        return this.cachedApp;
    }
    createHandler() {
        return async (event, context, callback) => {
            if (!this.cachedServer) {
                const app = await this.bootstrap();
                const expressHandler = app.getHttpAdapter().getInstance();
                this.cachedServer = (0, serverless_express_1.configure)({ app: expressHandler });
            }
            return this.cachedServer(event, context, callback);
        };
    }
}
exports.ApiGatewayEventMiddleware = ApiGatewayEventMiddleware;
//# sourceMappingURL=api-gateway-event.middleware.js.map