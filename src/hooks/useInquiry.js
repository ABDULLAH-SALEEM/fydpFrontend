import { retrieveData } from 'src/helper/storageHelper';
import { axiosApi } from 'src/service/apiEnviornment';

export const useInquiry = () => {
  const getInquiries = async () => {
    try {
      const resp = axiosApi('get', '/inquiry/get-inquiry-by-email');
      if (resp) {
        return resp;
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const getSingleInquiry = async (id) => {
    try {
      const resp = axiosApi('get', `/inquiry/get-inquiry-by-id/${id}`);
      if (resp) {
        return resp;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getInquiries,
    getSingleInquiry
  };
};
