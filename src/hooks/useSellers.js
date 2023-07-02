import { retrieveData } from 'src/helper/storageHelper';
import { axiosApi } from 'src/service/apiEnviornment';

export const useSeller = () => {
  const getSellers = async () => {
    try {
      const resp = axiosApi('get', '/sellers/get-all-sellers');
      if (resp) {
        return resp;
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const getSingleSeller = async (id) => {
    try {
      const resp = axiosApi('get', `/sellers/get-seller-by-id/${id}`);
      if (resp) {
        return resp;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getSellers,
    getSingleSeller
  };
};
