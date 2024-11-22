import { EletrodomesticoData } from './EletrodomesticoTypes';

export interface ComodoData {
  id: string; 
  nome: string; 
  descricao?: string; 
  eletrodomesticos?: EletrodomesticoData[]; 
}