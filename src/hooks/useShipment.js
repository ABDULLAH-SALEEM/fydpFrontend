import { axiosApi } from 'src/service/apiEnviornment';

export const useShipment = () => {
  const getShipments = async () => {
    try {
      const resp = axiosApi('get', `/shipment/get-all-shipment`);
      if (resp) {
        return resp;
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  const createShipment = (data) => {
    try {
      const resp = axiosApi('post', `/shipment/create-shipment`, { ...data });
      if (resp) {
        return resp;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSingleShipment = async (id) => {
    try {
      const resp = axiosApi('get', `/shipment/get-shipment-by-id/${id}`);
      if (resp) {
        return resp;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getShipments,
    getSingleShipment,
    createShipment,
  };
};
