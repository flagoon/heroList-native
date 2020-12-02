import axios, { AxiosResponse } from 'axios';
import { ENDPOINTS, HOST } from './CONSTS';

export const getAllHeros = async (): Promise<Hero[]> => {
  const backendData = await axios.get(`${HOST}${ENDPOINTS.heroes}`);
  return backendData.data.data;
};

export const getAllTypes = async (): Promise<AxiosResponse<HeroType[]>> => {
  return axios.get(`${HOST}${ENDPOINTS.types}`);
};

export const createHero = async (hero: {
  full_name: string;
  description: string;
  avatar_url: string;
  type: string;
}): Promise<AxiosResponse<void>> => {
  return axios.post(`${HOST}${ENDPOINTS.heroes}`, hero);
};

export const deleteHero = async (id: string): Promise<AxiosResponse<Hero>> => {
  return axios.delete(`${HOST}${ENDPOINTS.heroes}/${id}`);
};

export const getAllAvatars = async (): Promise<Avatar[]> => {
  const result = await axios.get<Avatar[], AxiosResponse<Avatar[]>>(
    `${HOST}${ENDPOINTS.avatars}`,
  );
  return result.data;
};
