"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerlessHandler = void 0;
const common_1 = require("@nestjs/common");
const api_gateway_event_middleware_1 = require("./api-gateway-event.middleware");
const event_bridge_event_middleware_1 = require("./event-bridge-event.middleware");
const sqs_event_middleware_1 = require("./sqs-event.middleware");
const sns_event_middleware_1 = require("./sns-event.middleware");
const http_exception_filter_1 = require("../exceptions/http-exception.filter");
class ServerlessHandler {
    constructor(config) {
        this.config = config;
        if (!this.config.appConfigurator) {
            this.config.appConfigurator = (app) => this.configureDefaultApp(app);
        }
    }
    configureDefaultApp(app) {
        app.enableCors({
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            allowedHeaders: [
                'Content-Type',
                'Accept',
                'Authorization',
                'X-Requested-With',
            ],
            credentials: true,
            preflightContinue: false,
            optionsSuccessStatus: 204,
        });
        app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }));
    }
    createHttpHandler() {
        return new api_gateway_event_middleware_1.ApiGatewayEventMiddleware(this.config).createHandler();
    }
    createEventBridgeHandler(config) {
        return new event_bridge_event_middleware_1.EventBridgeEventMiddleware(this.config).createHandler(config);
    }
    createSqsHandler(config) {
        return new sqs_event_middleware_1.SqsEventMiddleware(this.config).createHandler(config);
    }
    createSnsHandler(config) {
        return new sns_event_middleware_1.SnsEventMiddleware(this.config).createHandler(config);
    }
}
exports.ServerlessHandler = ServerlessHandler;
//# sourceMappingURL=serverless-handler.js.map