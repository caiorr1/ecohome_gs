// api/AdminService.ts
import axios from 'axios';
import { ComodoData } from './types/AdminTypes';

const BASE_URL = 'http://seu-servidor-api.com';

// Função para adicionar um novo cômodo
export const addComodo = async (comodoData: ComodoData) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/comodos`, comodoData);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar cômodo:', error);
    throw error;
  }
};

// Outras funções podem seguir a mesma estrutura para deletar, atualizar, etc.
