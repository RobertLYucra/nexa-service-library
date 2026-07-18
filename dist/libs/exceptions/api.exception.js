"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiException = void 0;
const common_1 = require("@nestjs/common");
class ApiException {
    static createError(message, field, code) {
        console.log('API EXCEPTION: ', { message, field, code });
        return {
            message,
            errors: [
                {
                    field,
                    message,
                    code,
                },
            ],
        };
    }
    static unauthorized(message, field, code = 'UNAUTHORIZED') {
        return new common_1.UnauthorizedException(this.createError(message, field, code));
    }
    static badRequest(message, field, code = 'BAD_REQUEST') {
        return new common_1.BadRequestException(this.createError(message, field, code));
    }
    static forbidden(message, field, code = 'FORBIDDEN') {
        return new common_1.ForbiddenException(this.createError(message, field, code));
    }
    static notFound(resource, field, code) {
        const errorCode = code || `${resource.toUpperCase().replace(/\s/g, '_')}_NOT_FOUND`;
        return new common_1.NotFoundException(this.createError(`${resource}`, field, errorCode));
    }
    static conflict(resource, field, code) {
        const errorCode = code || `${resource.toUpperCase().replace(/\s/g, '_')}_EXISTS`;
        return new common_1.ConflictException(this.createError(`${resource}`, field, errorCode));
    }
    static tokenExpired() {
        return this.unauthorized('El token ha expirado', 'token', 'TOKEN_EXPIRED');
    }
    static tokenInvalid() {
        return this.unauthorized('Token inválido', 'token', 'TOKEN_INVALID');
    }
    static permissionDenied(resource = 'recurso', field) {
        return this.forbidden(`No tienes permiso para acceder a este ${resource}`, field, 'PERMISSION_DENIED');
    }
    static insufficientStock(available, field = 'quantity') {
        return this.badRequest(`Stock insuficiente. Disponible: ${available}`, field, 'INSUFFICIENT_STOCK');
    }
    static limitExceeded(limit, field) {
        return this.badRequest(`Límite excedido. Máximo permitido: ${limit}`, field, 'LIMIT_EXCEEDED');
    }
    static duplicateEntry(field, value) {
        const message = value
            ? `El valor '${value}' ya existe para ${field}`
            : `Entrada duplicada en ${field}`;
        return this.conflict(field, field, 'DUPLICATE_ENTRY');
    }
    static databaseError(message = 'Error en la base de datos', field) {
        return new common_1.InternalServerErrorException(this.createError(message, field, 'DATABASE_ERROR'));
    }
    static balanceInsufficient(available, channel, field = 'saldo') {
        return this.badRequest(`Saldo insuficiente. Disponible: ${available} para el canal ${channel}`, field, 'BALANCE_INSUFFICIENT');
    }
    static internalServerError(message = 'Error interno del servidor', field) {
        return new common_1.InternalServerErrorException(this.createError(message, field, 'INTERNAL_SERVER_ERROR'));
    }
    static s3FileNotFound(fileKey, field) {
        return this.notFound(`Archivo no encontrado en S3: ${fileKey}`, field, 'S3_FILE_NOT_FOUND');
    }
    static s3Error(message, field) {
        return new common_1.InternalServerErrorException(this.createError(`Error de S3: ${message}`, field, 'S3_ERROR'));
    }
}
exports.ApiException = ApiException;
//# sourceMappingURL=api.exception.js.map