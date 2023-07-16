import { axiosApi } from 'src/service/apiEnviornment';

export const useAssignment = () => {
  const getAssignments = async () => {
    try {
      const resp = axiosApi('get', `/assignment/get-all-assignment`);
      if (resp) {
        return resp;
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const createAssignment = (data) => {
    try {
      const resp = axiosApi('post', `/assignment/create-assignment`, { ...data });
      if (resp) {
        return resp;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSingleAssignment = async (id) => {
    try {
      const resp = axiosApi('get', `/assignment/get-assignment-by-id/${id}`);
      if (resp) {
        return resp;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getAssignments,
    getSingleAssignment,
    createAssignment,
  };
};
