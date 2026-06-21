export function removeNumbers(value: string) {
  return value.replace(/\d+/g, "");
}

export function hasNumbers(value: string) {
  return /\d/.test(value);
}
