export declare class DateUtil {
    private static readonly PERU_OFFSET_HOURS;
    static getPeruDate(date?: Date): Date;
    static toPeruISOString(): string;
    static getPeruTimestamp(): number;
    static formatDate(date: Date): string;
}
