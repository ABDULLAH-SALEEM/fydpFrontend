import { Container, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useOrder } from 'src/hooks/useOrder';
import OrderTable from './Components/OrderList';
import { useQuotation } from 'src/hooks/useQuotation';
import OrderDetails from './Components/OrderDetails';
import myABI from '../../../contracts/Owner.json';
import { OwnerContractAddress } from 'src/contracts/Constants';
import { ethers } from 'ethers';
import OrderHistoryModal from './Components/OrderHistoryModal';

let arrayTemp = [];
const PurchaserOrders = () => {
  const [orders, setOrders] = useState();
  const [order, setOrder] = useState();
  const [signleQuotation, setSingleQuotation] = useState();
  const [open, setOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const { getUserOrders, getSingleOrder, getOwnerHistory } = useOrder();
  const { getSingleQuotation } = useQuotation();
  const [loading, setLoading] = useState(true);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(OwnerContractAddress, myABI, signer);
  const [orderHistory, setOrderHistory] = useState([]);

  const verifyTransfer = async (id) => {
    setLoading(true);
    try {
      // if (arrayTemp.length) {
      //   arrayTemp.length = 0;
      // }
      setOpen(false);
      setHistoryOpen(true);
      const checkVar2 = await contract.getOwnershipTransfersByOrder(id);
      await getUsers(checkVar2);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const getUsers = (array) => {
   
    return array.map(async (subArray) => {
      const resp = await getOwnerHistory(subArray[1]);
      const temp = {
        name: resp.data.firstname + ' ' + resp.data.lastname,
        role: resp.data.role,
        email: resp.data.email,
        timeStamp: subArray[2],
      };
      arrayTemp.push(temp);
      setOrderHistory([...arrayTemp]);
    });
  };

  const handleChange = () => {
    setOpen(false);
  };
  const handleHistoryChange = () => {
    setHistoryOpen(false);
  };

  const getUserOrdersData = async () => {
    try {
      const resp = await getUserOrders();
      if (resp) {
        setOrders(resp.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSingleOrderData = async (id) => {
    try {
      const resp = await getSingleOrder(id);
      if (resp) {
        const quotation = await getSingleQuotation(resp.data.quotationId);
        setSingleQuotation(quotation.data);
        setOrder(resp.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserOrdersData();
  }, []);

  const onViewButtonClicked = (id) => {
    setOpen(true);
    getSingleOrderData(id);
  };
  return (
    <div>
      <Helmet>
        <title> Orders </title>
      </Helmet>
      <Container>
        <Typography variant="h4" gutterBottom>
          My Orders
        </Typography>
      </Container>

      {orders?.length >= 0 && <OrderTable data={orders} onViewButtonClicked={onViewButtonClicked} />}

      {order && (
        <OrderDetails
          handleChange={handleChange}
          open={open}
          data={order}
          quotation={signleQuotation}
          onOrderTrack={verifyTransfer}
        />
      )}

      {orderHistory && (
        <OrderHistoryModal
          handleChange={handleHistoryChange}
          open={historyOpen}
          data={orderHistory}
          loading={loading}
        />
      )}
    </div>
  );
};

export default PurchaserOrders;
