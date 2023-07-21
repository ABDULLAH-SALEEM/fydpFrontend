import { axiosApi } from 'src/service/apiEnviornment';

export const useDashboard = () => {
  const getSellerDashboardData = async () => {
    try {
      const resp = axiosApi('get', `/dashboard/seller-dashboard`);
      if (resp) {
        return resp;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getPurchaserDashboardData = async () => {
    try {
      const resp = axiosApi('get', `/dashboard/purchaser-dashboard`);
      if (resp) {
        return resp;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getSellerDashboardData,
    getPurchaserDashboardData,
  };
};
