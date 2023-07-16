import { retrieveData } from 'src/helper/storageHelper';
import { axiosApi } from 'src/service/apiEnviornment';

export const useProduct = () => {
  const getProducts = async () => {
    try {
      const resp = axiosApi('get', `/product/get-all-products`);
      if (resp) {
        return resp;
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const getUserProducts = async (userId) => {
    try {
      const resp = axiosApi('get', `/product/get-user-products/${userId}`);
      if (resp) {
        return resp;
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const createProduct = (data) => {
    try {
      const resp = axiosApi('post', `/product/create-product`, { ...data });
      if (resp) {
        return resp;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateProduct = async (id, data) => {
    try {
      const resp = axiosApi('put', `/product/update-product/${id}`, { ...data });
      if (resp) {
        return resp;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return {
    getProducts,
    createProduct,
    updateProduct,
    getUserProducts
  };
};
