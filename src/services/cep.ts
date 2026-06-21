export type ViaCepResponse = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia?: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
};

export function onlyNumbers(value: string): string {
  return value.replace(/\D/g, "");
}

export function formatCep(value: string): string {
  const numbers = onlyNumbers(value).slice(0, 8);

  if (numbers.length <= 5) return numbers;

  return `${numbers.slice(0, 5)}-${numbers.slice(5)}`;
}

export async function findAddressByCep(
  cep: string,
): Promise<ViaCepResponse> {
  const normalizedCep = onlyNumbers(cep);

  if (normalizedCep.length !== 8) {
    throw new Error("Informe um CEP com 8 números.");
  }

  const response = await fetch(
    `https://viacep.com.br/ws/${normalizedCep}/json/`,
  );

  if (!response.ok) {
    throw new Error("Não foi possível consultar o CEP.");
  }

  const data = (await response.json()) as ViaCepResponse;

  if (data.erro) {
    throw new Error("CEP não encontrado.");
  }

  return data;
}
