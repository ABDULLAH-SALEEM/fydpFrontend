import { Container, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSeller } from 'src/hooks/useSellers';
import SellersListTable from './components/sellersListTable';
import SellerDetails from './components/sellerDetails';
import RequirenmentModal from './components/RequirmenetModal';
import { storeData } from 'src/helper/storageHelper';

const SellerList = () => {
  const [sellers, setSellers] = useState();
  const [seller, setSeller] = useState();
  const [open, setOpen] = useState(false);
  const { getSellers, getSingleSeller } = useSeller();
  const [inQuiryFormOpen, setInQuiryFormOpen] = useState(false);
  const handleInquiryFormChange = () => {
    setInQuiryFormOpen(!inQuiryFormOpen);
  };

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

  const onInquiryButtonClicked = () => {
    storeData('inquirySendTo', seller);
    setOpen(false);
    setInQuiryFormOpen(true);
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

      {seller && <SellerDetails handleClose={handleClose} open={open} data={seller}  onClick={onInquiryButtonClicked}/>}

      <RequirenmentModal open={inQuiryFormOpen} handleChange={handleInquiryFormChange} />
    </div>
  );
};

export default SellerList;
