import { retrieveData } from 'src/helper/storageHelper';
import { axiosApi } from 'src/service/apiEnviornment';

export const useQuotation = () => {
  const getQuotations = async () => {
    try {
      const resp = axiosApi('get', '/quotation/get-quotation-by-email');
      if (resp) {
        return resp;
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const getQuotationUser = async (data) => {
    try {
      const resp = axiosApi('get', `/auth/get-user/${data.email}`);
      if (resp) {
        return resp;
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const getQuotationSender = async (data) => {
    try {
      const resp = axiosApi('get', `/quotation/get-quotation-sender/${data.id}`);
      if (resp) {
        return resp;
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const getUserQuotations = async () => {
    try {
      const resp = axiosApi('get', '/quotation/get-user-quotation');
      if (resp) {
        return resp;
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const getSingleQuotation = async (id) => {
    try {
      const resp = axiosApi('get', `/quotation/get-quotation-by-id/${id}`);
      if (resp) {
        return resp;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createQuotation = (data) => {
    try {
      const resp = axiosApi('post', `/quotation/create-quotation`, { ...data });
      if (resp) {
        return resp;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateQuotation = async (id, data) => {
    try {
      const resp = axiosApi('put', `/quotation/update-quotation-by-id/${id}`, { ...data });
      if (resp) {
        return resp;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return {
    getQuotations,
    createQuotation,
    getSingleQuotation,
    getUserQuotations,
    getQuotationUser,
    getQuotationSender,
    updateQuotation,
  };
};
