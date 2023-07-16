import { retrieveData } from 'src/helper/storageHelper';
import { axiosApi } from 'src/service/apiEnviornment';

export const useOrder = () => {
  const getOrders = async () => {
    try {
      const resp = axiosApi('get', '/order/get-all-orders');
      if (resp) {
        return resp;
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const getUserOrders = async () => {
    try {
      const resp = axiosApi('get', '/order/get-user-orders');
      if (resp) {
        return resp;
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const getSingleOrder = async (id) => {
    try {
      const resp = axiosApi('get', `/order/get-order-by-id/${id}`);
      if (resp) {
        return resp;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createOrder = (data) => {
    try {
      const resp = axiosApi('post', `/order/create-order`, { ...data });
      if (resp) {
        return resp;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateOrder = async (id, data) => {
    try {
      const resp = axiosApi('put', `/order/update-order-by-id/${id}`, { ...data });
      if (resp) {
        return resp;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return {
    createOrder,
    getUserOrders,
    getSingleOrder,
    getOrders,
    updateOrder,
  };
};
