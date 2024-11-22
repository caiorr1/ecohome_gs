// api/AdminService.ts
import axios from 'axios';
import { EletrodomesticoData } from './types/EletrodomesticoTypes';
import { ComodoData } from './types/ComodoTypes';

const BASE_URL = 'http://localhost:8082';

export const addComodo = async (comodoData: ComodoData) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/comodos`, comodoData);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar cômodo:', error);
    throw error;
  }
};

export const deleteComodo = async (id: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/comodos/${id}/delete`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar cômodo:', error);
    throw error;
  }
};

export const addEletrodomestico = async (eletrodomesticoData: EletrodomesticoData) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/eletrodomesticos`, eletrodomesticoData);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar eletrodoméstico:', error);
    throw error;
  }
};

export const deleteEletrodomestico = async (id: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/eletrodomesticos/${id}/delete`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar eletrodoméstico:', error);
    throw error;
  }
};
