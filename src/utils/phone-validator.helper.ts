/**
 * Valida y limpia números de teléfono peruanos
 * @param phone - Número de teléfono a validar
 * @returns Objeto con el resultado de la validación
 */
export function validatePeruvianPhone(phone: string | number): {
  isValid: boolean;
  cleanPhone: string;
  message?: string;
} {
  // Convertir a string y limpiar
  const phoneStr = String(phone || '').trim();

  // Remover todos los caracteres no numéricos
  const cleanPhone = phoneStr.replace(/\D/g, '');

  // Validar longitud y formato
  if (cleanPhone.length !== 9) {
    return {
      isValid: false,
      cleanPhone,
      message: 'El número debe tener 9 dígitos',
    };
  }

  // Validar que comience con 9 (celulares en Perú)
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

/**
 * Valida si un número es un celular peruano válido
 * @param phone - Número a validar
 * @returns true si es válido, false si no
 */
export function isValidPeruvianPhone(phone: string | number): boolean {
  const result = validatePeruvianPhone(phone);
  return result.isValid;
}
