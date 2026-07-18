"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHelper = void 0;
const mime = require("mime-types");
class FileHelper {
    static validateExtension(fileName, allowedExtensions) {
        const extension = this.getExtension(fileName);
        const allowed = allowedExtensions.map((ext) => ext.startsWith('.') ? ext.toLowerCase() : `.${ext.toLowerCase()}`);
        if (!allowed.includes(extension)) {
            throw new Error(`Solo se permiten archivos: ${allowed.join(', ')}`);
        }
    }
    static validateSize(fileSizeBytes, maxSizeMB) {
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        if (fileSizeBytes > maxSizeBytes) {
            throw new Error(`El archivo no puede ser mayor a ${maxSizeMB}MB`);
        }
    }
    static isExcel(fileName) {
        const mimeType = mime.lookup(fileName);
        return (mimeType ===
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            mimeType === 'application/vnd.ms-excel');
    }
    static isImage(fileName) {
        const mimeType = mime.lookup(fileName);
        return typeof mimeType === 'string' && mimeType.startsWith('image/');
    }
    static isPDF(fileName) {
        const mimeType = mime.lookup(fileName);
        return mimeType === 'application/pdf';
    }
    static isDocument(fileName) {
        const mimeType = mime.lookup(fileName);
        if (!mimeType)
            return false;
        return [
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain',
            'application/rtf',
        ].includes(mimeType);
    }
    static getContentType(fileName) {
        const mimeType = mime.lookup(fileName);
        return mimeType || 'application/octet-stream';
    }
    static getExtension(fileName) {
        return fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
    }
}
exports.FileHelper = FileHelper;
//# sourceMappingURL=file.helper.js.map