import { UnauthorizedException, BadRequestException, NotFoundException, ConflictException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
export declare class ApiException {
    private static createError;
    static unauthorized(message: string, field?: string, code?: string): UnauthorizedException;
    static badRequest(message: string, field?: string, code?: string): BadRequestException;
    static forbidden(message: string, field?: string, code?: string): ForbiddenException;
    static notFound(resource: string, field?: string, code?: string): NotFoundException;
    static conflict(resource: string, field?: string, code?: string): ConflictException;
    static tokenExpired(): UnauthorizedException;
    static tokenInvalid(): UnauthorizedException;
    static permissionDenied(resource?: string, field?: string): ForbiddenException;
    static insufficientStock(available: number, field?: string): BadRequestException;
    static limitExceeded(limit: number, field?: string): BadRequestException;
    static duplicateEntry(field: string, value?: string): ConflictException;
    static databaseError(message?: string, field?: string): InternalServerErrorException;
    static balanceInsufficient(available: number, channel: string, field?: string): BadRequestException;
    static internalServerError(message?: string, field?: string): InternalServerErrorException;
    static s3FileNotFound(fileKey: string, field?: string): NotFoundException;
    static s3Error(message: string, field?: string): InternalServerErrorException;
}
