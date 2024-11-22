import axios from 'axios';
import { SignupData, LoginData } from './types/AuthTypes';

const BASE_URL = 'http://localhost:8082';

export const signup = async (signupData: SignupData) => {
  try {
    const response = await axios.post(`${BASE_URL}/req/signup`, signupData);
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer signup:', error);
    throw error;
  }
};

export const login = async (loginData: LoginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/req/login`, loginData);
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};
