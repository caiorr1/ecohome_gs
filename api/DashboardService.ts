import axios from 'axios';

const BASE_URL = 'http://seu-servidor-api.com';

// Função para obter dados do consumo
export const getConsumos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/dashboard/consumos`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter consumos:', error);
    throw error;
  }
};

// Outras funções para /dashboard/comodos, /dashboard/eletrodomésticos, etc.
