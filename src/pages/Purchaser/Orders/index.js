import { Container, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useOrder } from 'src/hooks/useOrder';
import OrderTable from './Components/OrderList';
import { useQuotation } from 'src/hooks/useQuotation';
import OrderDetails from './Components/OrderDetails';
import myABI from '../../../contracts/Owner.json';
import ratingAbi from '../../../contracts/rating.json';
import { OwnerContractAddress, RatingContractAddress } from 'src/contracts/Constants';
import { ethers } from 'ethers';
import OrderHistoryModal from './Components/OrderHistoryModal';
import RatingQuestionary from './Components/RatingQuestionary';
import { useRating } from 'src/hooks/userRating';
import { useAuth } from 'src/hooks/useAuth';
import { useSnack } from 'src/hooks/useSnack';

let arrayTemp = [];
const PurchaserOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState();
  const [order, setOrder] = useState();
  const [signleQuotation, setSingleQuotation] = useState();
  const [open, setOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const { updateOrder } = useOrder();
  const { getUserOrders, getSingleOrder, getOwnerHistory } = useOrder();
  const { createRating } = useRating();
  const { getSingleQuotation } = useQuotation();
  const [loading, setLoading] = useState(true);
  const { showSnackBar } = useSnack();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(OwnerContractAddress, myABI, signer);
  const ratingContract = new ethers.Contract(RatingContractAddress, ratingAbi, signer);
  const [orderHistory, setOrderHistory] = useState([]);

  const handleRatingModal = () => {
    setRatingModalOpen(!ratingModalOpen);
  };

  const verifyTransfer = async (id) => {
    setLoading(true);
    try {
      // if (arrayTemp.length) {
      //   arrayTemp.length = 0;
      // }
      
      const checkVar2 = await contract.getOwnershipTransfersByOrder(id);
      console.log(checkVar2)
      await getUsers(checkVar2);
      setOpen(false);
      setHistoryOpen(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const postRating = async (data) => {
    const resp = await ratingContract.rateSeller(data.ratingFrom, data.ratingTo, Math.round(data.rating));
    console.log(resp);
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

  const provideRating = async (data) => {
    const overAllRating = (data.question1 + data.question2 + data.question3 + data.question4 + data.question5) / 5;
    console.log(overAllRating, 'sdfwfef');
    const postData = {
      ratingTo: signleQuotation.userId,
      ratingFrom: user._id,
      rating: Math.round(overAllRating),
    };
    try {
      const resp = await createRating(postData);
      await updateOrder(order._id, { status: 'Accepted' });
      await postRating(postData);
      if (resp) {
        showSnackBar(resp.message, 'success');
        setOpen(false);
        handleRatingModal();
        getUserOrdersData()
      }
    } catch (e) {
      console.log(e);
      showSnackBar(e, 'error');
    }
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
          handleRatingModal={handleRatingModal}
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
      <RatingQuestionary open={ratingModalOpen} onSubmit={provideRating} handleRatingModal={handleRatingModal} />
    </div>
  );
};

export default PurchaserOrders;
