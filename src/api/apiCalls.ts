import axios, { AxiosResponse } from 'axios';
import { ENDPOINTS, HOST } from './CONSTS';

export const getAllHeros = async (): Promise<AxiosResponse> => {
  return axios.get(`${HOST}${ENDPOINTS.heroes}`);
};
