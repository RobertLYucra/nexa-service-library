"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const response_util_1 = require("../utils/response.util");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let errors = [];
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            if (typeof exceptionResponse === 'string') {
                message = exceptionResponse;
                errors = [{ message: exceptionResponse }];
            }
            else if (typeof exceptionResponse === 'object') {
                const response = exceptionResponse;
                if (Array.isArray(response.message)) {
                    message = 'Validation failed';
                    errors = this.formatValidationErrors(response.message);
                }
                else {
                    message = response.message || message;
                    if (response.errors) {
                        errors = Array.isArray(response.errors)
                            ? response.errors
                            : [{ message: response.errors }];
                    }
                    else {
                        errors = [{ message }];
                    }
                }
            }
        }
        else if (exception instanceof Error) {
            message = exception.message;
            errors = [{ message: exception.message, code: 'INTERNAL_ERROR' }];
        }
        response.status(status).json(response_util_1.ResponseUtil.error(message, errors));
    }
    formatValidationErrors(validationErrors) {
        const errors = [];
        validationErrors.forEach((error) => {
            if (typeof error === 'string') {
                errors.push({ message: error });
            }
            else if (error.constraints) {
                Object.values(error.constraints).forEach((constraint) => {
                    errors.push({
                        field: error.property,
                        message: constraint,
                        code: 'VALIDATION_ERROR',
                    });
                });
            }
            else if (error.children && error.children.length > 0) {
                errors.push(...this.formatValidationErrors(error.children));
            }
        });
        return errors;
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)()
], HttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map