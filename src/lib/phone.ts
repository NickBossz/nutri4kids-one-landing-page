export function onlyPhoneNumbers(value: string): string {
  return value.replace(/\D/g, "").slice(0, 11);
}

export function formatPhone(value: string): string {
  const numbers = onlyPhoneNumbers(value);

  if (numbers.length === 0) return "";
  if (numbers.length <= 2) return `(${numbers}`;
  if (numbers.length <= 6) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  }

  if (numbers.length <= 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  }

  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
}

export function isValidBrazilianPhone(value: string): boolean {
  const numbers = onlyPhoneNumbers(value);

  if (numbers.length !== 10 && numbers.length !== 11) {
    return false;
  }

  const ddd = Number(numbers.slice(0, 2));

  if (ddd < 11 || ddd > 99) {
    return false;
  }

  if (/^(\d)\1+$/.test(numbers)) {
    return false;
  }

  if (numbers.length === 11 && numbers.charAt(2) !== "9") {
    return false;
  }

  if (numbers.length === 10 && !/^[2-5]$/.test(numbers.charAt(2))) {
    return false;
  }

  return true;
}

export function phoneToWhatsApp(value: string): string {
  const numbers = onlyPhoneNumbers(value);
  return numbers ? `55${numbers}` : "";
}
