"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationCategory = exports.NotificationSeverity = exports.NotificationType = void 0;
var NotificationType;
(function (NotificationType) {
    NotificationType["INFO"] = "info";
    NotificationType["SUCCESS"] = "success";
    NotificationType["WARNING"] = "warning";
    NotificationType["ERROR"] = "error";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
var NotificationSeverity;
(function (NotificationSeverity) {
    NotificationSeverity["LOW"] = "low";
    NotificationSeverity["MEDIUM"] = "medium";
    NotificationSeverity["HIGH"] = "high";
    NotificationSeverity["CRITICAL"] = "critical";
})(NotificationSeverity || (exports.NotificationSeverity = NotificationSeverity = {}));
var NotificationCategory;
(function (NotificationCategory) {
    NotificationCategory["REPORT_READY"] = "report_ready";
    NotificationCategory["BALANCE_ALERT"] = "balance_alert";
    NotificationCategory["SYSTEM_ALERT"] = "system_alert";
    NotificationCategory["BILLING"] = "billing";
    NotificationCategory["GENERAL"] = "general";
})(NotificationCategory || (exports.NotificationCategory = NotificationCategory = {}));
//# sourceMappingURL=notification.enum.js.map