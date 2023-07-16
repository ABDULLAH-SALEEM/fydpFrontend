import { retrieveData } from 'src/helper/storageHelper';
import { axiosApi } from 'src/service/apiEnviornment';

export const useDistributer = () => {
  const getDistributers = async () => {
    try {
      const resp = axiosApi('get', '/distributer/get-all-distributer');
      if (resp) {
        return resp;
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const getSingleDistributer = async (id) => {
    try {
      const resp = axiosApi('get', `/distributer/get-distributer-by-id/${id}`);
      if (resp) {
        return resp;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getDistributers,
    getSingleDistributer,
  };
};
