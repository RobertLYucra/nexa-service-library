import { PassThrough, Readable } from 'stream';
export declare class S3Service {
    private readonly s3Client;
    private readonly bucket;
    private readonly region;
    private readonly reportPath;
    private readonly basePath;
    constructor();
    getPresignedUploadUrl(params: {
        userId: number;
        fileName: string;
        customPath?: string;
        contentType?: string;
    }): Promise<{
        url: string;
        expiresIn: number;
        s3KeyFile: string;
    }>;
    getBaseFile(fileKey: string): Promise<{
        getFileState: boolean;
        bodyFile?: Readable;
    }>;
    uploadFile(params: {
        buffer: Buffer;
        fileName: string;
        customPath?: string;
        contentType?: string;
    }): Promise<{
        s3Key: string;
        bucket: string;
    }>;
    getPresignedDownloadUrl(fileName: string, expiresIn?: number, s3Key?: string): Promise<{
        url: string;
        expiresIn: number;
    }>;
    uploadStream(params: {
        fileName: string;
        contentType: string;
        customPath?: string;
    }): Promise<{
        writeStream: PassThrough;
        uploadPromise: Promise<any>;
        s3Key: string;
    }>;
}
