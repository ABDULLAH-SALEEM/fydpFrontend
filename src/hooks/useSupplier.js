import { retrieveData } from 'src/helper/storageHelper';
import { axiosApi } from 'src/service/apiEnviornment';

export const useSupplier = () => {
  const getSuppliers = async () => {
    try {
      const resp = axiosApi('get', '/supplier/get-all-supplier');
      if (resp) {
        return resp;
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const getSingleSupplier = async (id) => {
    try {
      const resp = axiosApi('get', `/supplier/get-supplier-by-id/${id}`);
      if (resp) {
        return resp;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getSuppliers,
    getSingleSupplier,
  };
};
