import axios, { AxiosResponse } from 'axios';
import { URL } from '..';
import { headers } from '../';

interface Product {
  productId: number;
  companyId: number;
  imagePath: string;
  name: string;
  description: string;
  cost: number;
}

export const buyProduct = async (productID: number) => {
  const response = await axios.post(
    URL + `/market/products/${productID}`,
    {},
    {
      headers: { ...headers },
    }
  );
  return response.data;
};

export const getAllProducts = async () => {
  const response: AxiosResponse<Product[]> = await axios.get(
    URL + '/market/products',
    { headers: { ...headers } }
  );
  return response.data;
};
