// api/AuthService.ts
import axios from 'axios';
import { SignupData, LoginData } from './types/AuthTypes';

const BASE_URL = 'http://seu-servidor-api.com';

// Função para cadastro de usuário
export const signup = async (signupData: SignupData) => {
  try {
    const response = await axios.post(`${BASE_URL}/req/signup`, signupData);
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer signup:', error);
    throw error;
  }
};

// Função para login de usuário
export const login = async (loginData: LoginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/req/login`, loginData);
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};
