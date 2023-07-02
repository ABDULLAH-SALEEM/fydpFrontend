import { Container, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSeller } from 'src/hooks/useSellers';
import SellersListTable from './components/sellersListTable';

const SellerList = () => {
  const [sellers, setSellers] = useState();
  const [seller, setSeller] = useState();
  const [open, setOpen] = useState(false);
  const { getSellers, getSingleSeller } = useSeller();

  const handleClose = () => {
    setOpen(false);
  };

  const getAllSellers = async () => {
    try {
      const resp = await getSellers();
      if (resp) {
        setSellers(resp.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSingleSellerData = async (id) => {
    try {
      const resp = await getSingleSeller(id);
      if (resp) {
        setSeller(resp.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllSellers();
  }, []);

  const onViewButtonClicked = (id) => {
    setOpen(true);
    getSingleSellerData(id);
  };
  return (
    <div>
      <Helmet>
        <title> Sellers </title>
      </Helmet>
      <Container>
        <Typography variant="h4" gutterBottom>
          Avalaible sellers
        </Typography>
      </Container>
      {sellers?.length >= 0 && <SellersListTable data={sellers} onViewButtonClicked={onViewButtonClicked} />}
      {/* <EnquiriesTable data={inquiries} /> */}

      {/* {inquiry&& <InquiryDetails handleClose={handleClose} open={open} data={inquiry}/>} */}
    </div>
  );
};

export default SellerList;
