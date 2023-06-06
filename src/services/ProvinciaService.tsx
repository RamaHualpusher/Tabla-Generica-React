import axios from 'axios';
import { Provincia } from '../model/Provincia';

const BASE_URL = 'http://168.194.207.98:8081';  // Add the base URL

interface ProvinciaService {
  getProvincias: () => Promise<Provincia[]>;
  getProvincia: (id: number) => Promise<Provincia>;
  postProvincia: (provincia: Provincia) => Promise<void>;
  putProvincia: (provincia: Provincia) => Promise<void>;
  deleteProvincia: (id: number) => Promise<void>;
  searchProvincias: (searchText: string) => Promise<Provincia[]>;
}

const ProvinciaService: ProvinciaService = {
  getProvincias: async (): Promise<Provincia[]> => {
    const response = await axios.get<Provincia[]>(`${BASE_URL}/api_provincia/get_provincias.php`);
    return response.data;
  },
  getProvincia: async (id: number): Promise<Provincia> => {
    const response = await axios.get<Provincia>(`${BASE_URL}/api_provincia/get_provincia.php?id=${id}`);
    return response.data;
  },
  postProvincia: async (provincia: Provincia): Promise<void> => {
    await axios.post(`${BASE_URL}/api_provincia/post_provincia.php`, provincia);
  },
  putProvincia: async (provincia: Provincia): Promise<void> => {
    await axios.put(`${BASE_URL}/api_provincia/put_provincia.php`, provincia);
  },
  deleteProvincia: async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/api_provincia/delete_provincia.php?id=${id}`);
  },
  searchProvincias: async (searchText: string): Promise<Provincia[]> => {
    const response = await axios.get<Provincia[]>(`${BASE_URL}/api_provincia/get_provincias.php?nombre=${searchText}`);
    return response.data;
  },
};

export default ProvinciaService;
