"use server";

import { validateCep } from "./utils";

interface ViaCepResponse {
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
    erro?: boolean;
}

interface AddressResult {
    success: boolean;
    data?: { street: string; neighborhood: string; city: string; state: string };
    error?: string;
}
  
export async function getAddressByCep(cep: string): Promise<AddressResult> {
  const cleanCep = validateCep(cep);

  if (!cleanCep) {
    return { success: false, error: "CEP deve ter 8 dígitos" };
  }

  try {
    const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);

    if (!res.ok) {
      return { success: false, error: "Erro ao consultar CEP" };
    }

    const data: ViaCepResponse = await res.json();

    if (data.erro) {
      return { success: false, error: "CEP não encontrado" };
    }

    return {
      success: true,
      data: {
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
      },
    };
  } catch {
    return { success: false, error: "Erro de conexão ao buscar CEP" };
  }
}