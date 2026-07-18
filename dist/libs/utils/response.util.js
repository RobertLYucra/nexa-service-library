"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUtil = void 0;
class ResponseUtil {
    static success(message, data) {
        return {
            success: true,
            message,
            data,
        };
    }
    static error(message, errors) {
        return {
            success: false,
            message,
            errors: errors || [],
        };
    }
    static validationError(errors) {
        return {
            success: false,
            message: 'Error de validación',
            errors,
        };
    }
    static singleError(message, field, code) {
        return {
            success: false,
            message,
            errors: [{ message, field, code }],
        };
    }
}
exports.ResponseUtil = ResponseUtil;
//# sourceMappingURL=response.util.js.map