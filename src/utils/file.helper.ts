import * as mime from 'mime-types';

export class FileHelper {
  static validateExtension(
    fileName: string,
    allowedExtensions: string[],
  ): void {
    const extension = this.getExtension(fileName);

    // Normalize extensions to check (ensure they start with .)
    const allowed = allowedExtensions.map((ext) =>
      ext.startsWith('.') ? ext.toLowerCase() : `.${ext.toLowerCase()}`,
    );

    if (!allowed.includes(extension)) {
      throw new Error(`Solo se permiten archivos: ${allowed.join(', ')}`);
    }
  }

  static validateSize(fileSizeBytes: number, maxSizeMB: number): void {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (fileSizeBytes > maxSizeBytes) {
      throw new Error(`El archivo no puede ser mayor a ${maxSizeMB}MB`);
    }
  }

  static isExcel(fileName: string): boolean {
    const mimeType = mime.lookup(fileName);
    return (
      mimeType ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      mimeType === 'application/vnd.ms-excel'
    );
  }

  static isImage(fileName: string): boolean {
    const mimeType = mime.lookup(fileName);
    return typeof mimeType === 'string' && mimeType.startsWith('image/');
  }

  static isPDF(fileName: string): boolean {
    const mimeType = mime.lookup(fileName);
    return mimeType === 'application/pdf';
  }

  static isDocument(fileName: string): boolean {
    const mimeType = mime.lookup(fileName);
    if (!mimeType) return false;

    return [
      'application/msword', // doc
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
      'text/plain', // txt
      'application/rtf', // rtf
    ].includes(mimeType);
  }

  static getContentType(fileName: string): string {
    const mimeType = mime.lookup(fileName);
    return mimeType || 'application/octet-stream';
  }

  static getExtension(fileName: string): string {
    return fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
  }
}
