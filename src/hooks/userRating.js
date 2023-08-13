import { axiosApi } from 'src/service/apiEnviornment';

export const useRating = () => {
  const getRatings = async () => {
    try {
      const resp = axiosApi('get', `/rating/get-all-rating`);
      if (resp) {
        return resp;
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const createRating= (data) => {
    try {
      const resp = axiosApi('post', `/rating/create-rating`, { ...data });
      if (resp) {
        return resp;
      }
    } catch (err) {
      console.log(err);
    }
  };


  return {
    getRatings,
    createRating,
  };
};
