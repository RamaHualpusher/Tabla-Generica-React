import axios from 'axios';
import { Articulo } from '../model/Articulo';
import { Rubro } from '../model/Rubro'

const BASE_URL = 'http://168.194.207.98:8081';

interface ArticulosService {
  getRubros: () => Promise<Rubro[]>;
  getArticulosPorRubro: (idrubro: number) => Promise<Articulo[]>;
  getArticulo: (id: number) => Promise<Articulo>;
  getArticulosPorCodigo: (codigo: string) => Promise<Articulo>;
  postArticulo: (articulo: Articulo) => Promise<void>;
  putArticulo: (articulo: Articulo) => Promise<void>;
  deleteArticulo: (id: number) => Promise<void>;
}

const ArticulosService: ArticulosService = {
  getRubros: async (): Promise<Rubro[]> => {
    const response = await axios.get<Rubro[]>(`${BASE_URL}/api_articulo/get_rubros.php`);
    return response.data;
  },
  getArticulosPorRubro: async (idrubro: number): Promise<Articulo[]> => {
    const response = await axios.get<Articulo[]>(`${BASE_URL}/api_articulo/get_articulos_por_rubro.php?idrubro=${idrubro}`);
    return response.data;
  },
  getArticulo: async (id: number): Promise<Articulo> => {
    const response = await axios.get<Articulo>(`${BASE_URL}/api_articulo/get_articulo.php?id=${id}`);
    return response.data;
  },
  getArticulosPorCodigo: async (codigo: string): Promise<Articulo> => {
    const response = await axios.get<Articulo>(`${BASE_URL}/api_articulo/get_articulos_por_codigo.php?codigo=${codigo}`);
    return response.data;
  },
  postArticulo: async (articulo: Articulo): Promise<void> => {
    await axios.post(`${BASE_URL}/api_articulo/post_articulo.php`, articulo);
  },
  putArticulo: async (articulo: Articulo): Promise<void> => {
    await axios.put(`${BASE_URL}/api_articulo/put_articulo.php`, articulo);
  },
  deleteArticulo: async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/api_articulo/delete_articulo.php?id=${id}`);
  },
};

export default ArticulosService;
