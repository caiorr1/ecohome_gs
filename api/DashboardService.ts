import axios from 'axios';

const BASE_URL = 'http://localhost:8082';

export const getConsumos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/consumos`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter consumos:', error);
    throw error;
  }
};

export const getComodos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/comodos`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter cômodos:', error);
    throw error;
  }
};

export const getEletrodomesticos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/eletrodomesticos`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter eletrodomésticos:', error);
    throw error;
  }
};
