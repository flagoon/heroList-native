import axios, { AxiosResponse } from 'axios';
import { ENDPOINTS, HOST } from './CONSTS';

export const getAllHeros = async (): Promise<Hero[]> => {
  try {
    const backendData = await axios.get<{ data: Hero[] }>(
      `${HOST}${ENDPOINTS.heroes}`,
    );
    return backendData.data.data;
  } catch (error) {
    throw new Error(`Error while fetching heroes: ${error.message}`);
  }
};

export const getAllTypes = async (): Promise<HeroType[]> => {
  try {
    const result = await axios.get<HeroType[]>(`${HOST}${ENDPOINTS.types}`);
    return result.data;
  } catch (error) {
    throw new Error(`Error while fetching types: ${error.message}`);
  }
};

export const createHero = async (hero: {
  full_name: string;
  description: string;
  avatar_url: string;
  type: string;
}): Promise<AxiosResponse<void>> => {
  try {
    return axios.post(`${HOST}${ENDPOINTS.heroes}`, hero);
  } catch (error) {
    throw new Error(`Error while creating hero: ${error.message}`);
  }
};

export const deleteHero = async (id: string): Promise<AxiosResponse<Hero>> => {
  try {
    return axios.delete(`${HOST}${ENDPOINTS.heroes}/${id}`);
  } catch (error) {
    throw new Error(`Error while deleting hero: ${error.message}`);
  }
};

export const getAllAvatars = async (): Promise<Avatar[]> => {
  try {
    const result = await axios.get<Avatar[]>(`${HOST}${ENDPOINTS.avatars}`);
    return result.data;
  } catch (error) {
    throw new Error(`Error while fetching avatars: ${error.message}`);
  }
};
