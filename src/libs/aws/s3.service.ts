import {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { PassThrough, Readable } from 'stream';
import { ApiException } from '../../libs/exceptions/api.exception';
import * as mime from 'mime-types';
import { Upload } from '@aws-sdk/lib-storage';

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly bucket: string;
  private readonly region: string;
  private readonly reportPath: string;
  private readonly basePath: string;

  constructor() {
    this.region = process.env.AWS_REGION || 'us-east-2';
    this.bucket = process.env.AWS_BUCKET_NAME || 'nexa-test-files';
    this.reportPath =
      process.env.AWS_REPORT_PATH || 'modules/sms-short/reports';
    this.basePath = process.env.AWS_BASE_PATH || 'modules/sms-short/base';
    this.s3Client = new S3Client({ region: this.region });
  }

  async getPresignedUploadUrl(params: {
    userId: number;
    fileName: string;
    customPath?: string;
    contentType?: string;
  }): Promise<{
    url: string;
    expiresIn: number;
    s3KeyFile: string;
  }> {
    try {
      const { userId, fileName, customPath, contentType } = params;

      const timestamp = Date.now();
      const key = customPath
        ? `${customPath}/${userId}/${timestamp}-${fileName}`
        : `${this.basePath}/${userId}/${timestamp}-${fileName}`;

      const finalContentType =
        contentType || mime.lookup(fileName) || 'application/octet-stream';

      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        ContentType: finalContentType,
      });

      const expiresIn = 300;
      const url = await getSignedUrl(this.s3Client, command, { expiresIn });

      return {
        url,
        expiresIn,
        s3KeyFile: key,
      };
    } catch (err: any) {
      throw ApiException.s3Error(
        `Error al generar URL de subida: ${err.message}`,
      );
    }
  }

  async getBaseFile(fileKey: string): Promise<{
    getFileState: boolean;
    bodyFile?: Readable;
  }> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: fileKey,
      });

      const objectResponse = await this.s3Client.send(command);

      return {
        getFileState: true,
        bodyFile: objectResponse.Body as Readable,
      };
    } catch (err: any) {
      console.error('[S3Service] Error obteniendo archivo:', err);
      throw ApiException.s3Error(
        `Error al obtener archivo de S3: ${err.message}`,
      );
    }
  }

  async uploadFile(params: {
    buffer: Buffer;
    fileName: string;
    customPath?: string;
    contentType?: string;
  }): Promise<{
    s3Key: string;
    bucket: string;
  }> {
    try {
      const { buffer, fileName, customPath, contentType } = params;

      const timestamp = Date.now();
      const key = customPath
        ? `${customPath}/${timestamp}-${fileName}`
        : `${this.reportPath}/${timestamp}-${fileName}`;

      const finalContentType =
        contentType || mime.lookup(fileName) || 'application/octet-stream';

      const command = new PutObjectCommand({
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
    } catch (err: any) {
      throw ApiException.s3Error(`Error al subir archivo: ${err.message}`);
    }
  }

  async getPresignedDownloadUrl(
    fileName: string,
    expiresIn: number = 86400,
    s3Key?: string,
  ): Promise<{
    url: string;
    expiresIn: number;
  }> {
    try {
      const key = s3Key || `${this.reportPath}/${fileName}`;
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      const url = await getSignedUrl(this.s3Client, command, { expiresIn });

      return {
        url,
        expiresIn,
      };
    } catch (err: any) {
      throw ApiException.s3Error(
        `Error al generar URL de descarga: ${err.message}`,
      );
    }
  }

  async uploadStream(params: {
    fileName: string;
    contentType: string;
    customPath?: string;
  }): Promise<{
    writeStream: PassThrough;
    uploadPromise: Promise<any>;
    s3Key: string;
  }> {
    try {
      const passThrough = new PassThrough();

      const timestamp = Date.now();
      const key = params.customPath
        ? `${params.customPath}/${params.fileName}-${timestamp}`
        : `${this.reportPath}/${params.fileName}-${timestamp}`;

      const upload = new Upload({
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
    } catch (err: any) {
      throw ApiException.s3Error(
        `Error al iniciar upload stream: ${err.message}`,
      );
    }
  }
}
