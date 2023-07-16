import { Container, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import EnquiriesTable from './components/EnquiriesTable';
import InquiryDetails from './components/InquiryDetails';
import { useInquiry } from 'src/hooks/useInquiry';
import QuotationModal from '../Quotations/Components/quotationModal';
import { storeData } from 'src/helper/storageHelper';

const SellerInquiries = () => {
  const [inquiries, setInquiries] = useState();
  const [inquiry, setInquiry] = useState();
  const [open, setOpen] = useState(false);
  const { getInquiries, getSingleInquiry } = useInquiry();

  const [quotationFormOpen, setQuotationFormOpen] = useState(false);
  const handleQuotationFormChange = () => {
    setQuotationFormOpen(!quotationFormOpen);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getAllInquiries = async () => {
    try {
      const resp = await getInquiries();
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

  const onQuotationButtonClicked = () => {
    storeData('quotationSendTo', inquiry);
    setOpen(false);
    setQuotationFormOpen(true);
  };
  return (
    <div>
      <Helmet>
        <title> Inquiries </title>
      </Helmet>
      <Container>
        <Typography variant="h4" gutterBottom>
          Inquiries
        </Typography>
      </Container>
      {inquiries?.length >= 0 && <EnquiriesTable data={inquiries} onViewButtonClicked={onViewButtonClicked} />}
      {/* <EnquiriesTable data={inquiries} /> */}

      {inquiry && (
        <InquiryDetails
          handleClose={handleClose}
          open={open}
          data={inquiry}
          onQuotationButtonClicked={onQuotationButtonClicked}
        />
      )}
      <QuotationModal data={inquiry} open={quotationFormOpen} handleChange={handleQuotationFormChange}  />
    </div>
  );
};

export default SellerInquiries;
