export declare class FileHelper {
    static validateExtension(fileName: string, allowedExtensions: string[]): void;
    static validateSize(fileSizeBytes: number, maxSizeMB: number): void;
    static isExcel(fileName: string): boolean;
    static isImage(fileName: string): boolean;
    static isPDF(fileName: string): boolean;
    static isDocument(fileName: string): boolean;
    static getContentType(fileName: string): string;
    static getExtension(fileName: string): string;
}
