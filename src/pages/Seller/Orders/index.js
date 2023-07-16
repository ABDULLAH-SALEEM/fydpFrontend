import { Container, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useOrder } from 'src/hooks/useOrder';
import OrderTable from './Components/OrderList';
import { useQuotation } from 'src/hooks/useQuotation';
import OrderDetails from './Components/OrderDetails';

const SellerOrders = () => {
  const [orders, setOrders] = useState();
  const [order, setOrder] = useState();
  const [signleQuotation, setSingleQuotation] = useState();
  const [open, setOpen] = useState(false);
  const { getOrders, getSingleOrder } = useOrder();
  const { getSingleQuotation } = useQuotation();

  const handleChange = () => {
    setOpen(false);
  };

  const getUserOrdersData = async () => {
    try {
      const resp = await getOrders();
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

      {order && <OrderDetails handleChange={handleChange} open={open} data={order} quotation={signleQuotation} />}
    </div>
  );
};

export default SellerOrders;
