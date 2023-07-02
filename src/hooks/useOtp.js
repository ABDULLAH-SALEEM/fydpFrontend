import { retrieveData } from 'src/helper/storageHelper';
import { axiosApi } from 'src/service/apiEnviornment';

export const useOtp = () => {
  const removeOtp = async () => {
    const { email } = retrieveData('user');
    try {
      const resp = axiosApi('delete', '/auth/delete-otp', {
        email
      });
      if (resp) {
        return resp;
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return {
    removeOtp,
  };
};
