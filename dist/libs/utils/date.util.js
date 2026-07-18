"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtil = void 0;
class DateUtil {
    static getPeruDate(date) {
        const now = date || new Date();
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const peruTime = new Date(utc + 3600000 * this.PERU_OFFSET_HOURS);
        return peruTime;
    }
    static toPeruISOString() {
        return this.getPeruDate().toISOString();
    }
    static getPeruTimestamp() {
        return this.getPeruDate().getTime();
    }
    static formatDate(date) {
        return date.toISOString().replace('T', ' ').substring(0, 19);
    }
}
exports.DateUtil = DateUtil;
DateUtil.PERU_OFFSET_HOURS = -5;
//# sourceMappingURL=date.util.js.map