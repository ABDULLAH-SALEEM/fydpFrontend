import { Container, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
// import InquiryDetails from './components/InquiryDetails';
import { useInquiry } from 'src/hooks/useInquiry';
import InquiryList from './Components/InquiryList';
import InquiryDetails from 'src/pages/Seller/Enquiries/components/InquiryDetails';

const SellerInquiries = () => {
  const [inquiries, setInquiries] = useState();
  const [inquiry, setInquiry] = useState();
  const [open, setOpen] = useState(false);
  const { getUserInquiries, getSingleInquiry } = useInquiry();

  const handleClose = () => {
    setOpen(false);
  };

  const getAllInquiries = async () => {
    try {
      const resp = await getUserInquiries();
      if (resp) {
        console.log(resp);
        setInquiries(resp.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSingleInquiryData = async (id) => {
    try {
      const resp = await getSingleInquiry(id);
      if (resp) {
        setInquiry(resp.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllInquiries();
  }, []);

  const onViewButtonClicked = (id) => {
    setOpen(true);
    getSingleInquiryData(id);
  };
  return (
    <div>
      <Helmet>
        <title> Inquiries </title>
      </Helmet>
      <Container>
        <Typography variant="h4" gutterBottom>
          My Inquiries
        </Typography>
      </Container>
      {inquiries?.length >= 0 && <InquiryList data={inquiries} onViewButtonClicked={onViewButtonClicked} />}

      {inquiry && <InquiryDetails handleClose={handleClose} open={open} data={inquiry} />}
    </div>
  );
};

export default SellerInquiries;
