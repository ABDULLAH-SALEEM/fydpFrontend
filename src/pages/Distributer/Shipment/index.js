import { Container, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useShipment } from 'src/hooks/useShipment';
import ShipmentList from './Components/ShipmentList';
import ShipmentDetails from './Components/ShipmentDetails';

const DistributerShipments = () => {
  const [shipments, setShipments] = useState();
  const [shipment, setShipment] = useState();
  const [open, setOpen] = useState(false);
  const { getShipments, getSingleShipment } = useShipment();

  const handleClose = () => {
    setOpen(false);
  };

  const getAllShipments = async () => {
    try {
      const resp = await getShipments();
      if (resp) {
        setShipments(resp.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSingleShipmentData = async (id) => {
    try {
      const resp = await getSingleShipment(id);
      if (resp) {
        setShipment({ ...resp.data });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllShipments();
  }, []);

  const onViewButtonClicked = (id) => {
    setOpen(true);
    getSingleShipmentData(id);
  };

  return (
    <div>
      <Helmet>
        <title> Shippments </title>
      </Helmet>
      <Container>
        <Typography variant="h4" gutterBottom>
          My shipments
        </Typography>
      </Container>
      {shipments?.length >= 0 && <ShipmentList data={shipments} onViewButtonClicked={onViewButtonClicked} />}

      {shipment && <ShipmentDetails handleClose={handleClose} open={open} data={shipment} />}
    </div>
  );
};

export default DistributerShipments;
