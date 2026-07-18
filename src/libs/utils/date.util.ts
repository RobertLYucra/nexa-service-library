export class DateUtil {
  private static readonly PERU_OFFSET_HOURS = -5;

  static getPeruDate(date?: Date): Date {
    const now = date || new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const peruTime = new Date(utc + 3600000 * this.PERU_OFFSET_HOURS);

    return peruTime;
  }

  static toPeruISOString(): string {
    return this.getPeruDate().toISOString();
  }

  static getPeruTimestamp(): number {
    return this.getPeruDate().getTime();
  }

  static formatDate(date: Date): string {
    return date.toISOString().replace('T', ' ').substring(0, 19);
  }
}
