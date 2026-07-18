"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePeruvianPhone = validatePeruvianPhone;
exports.isValidPeruvianPhone = isValidPeruvianPhone;
function validatePeruvianPhone(phone) {
    const phoneStr = String(phone || '').trim();
    const cleanPhone = phoneStr.replace(/\D/g, '');
    if (cleanPhone.length !== 9) {
        return {
            isValid: false,
            cleanPhone,
            message: 'El número debe tener 9 dígitos',
        };
    }
    if (!cleanPhone.startsWith('9')) {
        return {
            isValid: false,
            cleanPhone,
            message: 'El número debe comenzar con 9',
        };
    }
    return {
        isValid: true,
        cleanPhone,
    };
}
function isValidPeruvianPhone(phone) {
    const result = validatePeruvianPhone(phone);
    return result.isValid;
}
//# sourceMappingURL=phone-validator.helper.js.map