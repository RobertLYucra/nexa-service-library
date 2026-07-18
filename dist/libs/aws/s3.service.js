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
exports.S3Service = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const common_1 = require("@nestjs/common");
const stream_1 = require("stream");
const api_exception_1 = require("../../libs/exceptions/api.exception");
const mime = require("mime-types");
const lib_storage_1 = require("@aws-sdk/lib-storage");
let S3Service = class S3Service {
    constructor() {
        this.region = process.env.AWS_REGION || 'us-east-2';
        this.bucket = process.env.AWS_BUCKET_NAME || 'nexa-test-files';
        this.reportPath =
            process.env.AWS_REPORT_PATH || 'modules/sms-short/reports';
        this.basePath = process.env.AWS_BASE_PATH || 'modules/sms-short/base';
        this.s3Client = new client_s3_1.S3Client({ region: this.region });
    }
    async getPresignedUploadUrl(params) {
        try {
            const { userId, fileName, customPath, contentType } = params;
            const timestamp = Date.now();
            const key = customPath
                ? `${customPath}/${userId}/${timestamp}-${fileName}`
                : `${this.basePath}/${userId}/${timestamp}-${fileName}`;
            const finalContentType = contentType || mime.lookup(fileName) || 'application/octet-stream';
            const command = new client_s3_1.PutObjectCommand({
                Bucket: this.bucket,
                Key: key,
                ContentType: finalContentType,
            });
            const expiresIn = 300;
            const url = await (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, { expiresIn });
            return {
                url,
                expiresIn,
                s3KeyFile: key,
            };
        }
        catch (err) {
            throw api_exception_1.ApiException.s3Error(`Error al generar URL de subida: ${err.message}`);
        }
    }
    async getBaseFile(fileKey) {
        try {
            const command = new client_s3_1.GetObjectCommand({
                Bucket: this.bucket,
                Key: fileKey,
            });
            const objectResponse = await this.s3Client.send(command);
            return {
                getFileState: true,
                bodyFile: objectResponse.Body,
            };
        }
        catch (err) {
            console.error('[S3Service] Error obteniendo archivo:', err);
            throw api_exception_1.ApiException.s3Error(`Error al obtener archivo de S3: ${err.message}`);
        }
    }
    async uploadFile(params) {
        try {
            const { buffer, fileName, customPath, contentType } = params;
            const timestamp = Date.now();
            const key = customPath
                ? `${customPath}/${timestamp}-${fileName}`
                : `${this.reportPath}/${timestamp}-${fileName}`;
            const finalContentType = contentType || mime.lookup(fileName) || 'application/octet-stream';
            const command = new client_s3_1.PutObjectCommand({
                Bucket: this.bucket,
                Key: key,
                Body: buffer,
                ContentType: finalContentType,
            });
            await this.s3Client.send(command);
            return {
                s3Key: key,
                bucket: this.bucket,
            };
        }
        catch (err) {
            throw api_exception_1.ApiException.s3Error(`Error al subir archivo: ${err.message}`);
        }
    }
    async getPresignedDownloadUrl(fileName, expiresIn = 86400, s3Key) {
        try {
            const key = s3Key || `${this.reportPath}/${fileName}`;
            const command = new client_s3_1.GetObjectCommand({
                Bucket: this.bucket,
                Key: key,
            });
            const url = await (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, { expiresIn });
            return {
                url,
                expiresIn,
            };
        }
        catch (err) {
            throw api_exception_1.ApiException.s3Error(`Error al generar URL de descarga: ${err.message}`);
        }
    }
    async uploadStream(params) {
        try {
            const passThrough = new stream_1.PassThrough();
            const timestamp = Date.now();
            const key = params.customPath
                ? `${params.customPath}/${params.fileName}-${timestamp}`
                : `${this.reportPath}/${params.fileName}-${timestamp}`;
            const upload = new lib_storage_1.Upload({
                client: this.s3Client,
                params: {
                    Bucket: this.bucket,
                    Key: key,
                    Body: passThrough,
                    ContentType: params.contentType,
                },
            });
            return {
                writeStream: passThrough,
                uploadPromise: upload.done(),
                s3Key: key,
            };
        }
        catch (err) {
            throw api_exception_1.ApiException.s3Error(`Error al iniciar upload stream: ${err.message}`);
        }
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], S3Service);
//# sourceMappingURL=s3.service.js.map