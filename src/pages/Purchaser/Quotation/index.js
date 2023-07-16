import { Container, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuotation } from 'src/hooks/useQuotation';
import QuotationDetails from './Compoenents/QuotationDetails';
import QuotationTable from './Compoenents/QuotationTable';


const PurchaserQuotations = () => {
  const [quotations, setQuotations] = useState();
  const [quotation, setQuotation] = useState();
  const [quotationUser, setQuotationUser] = useState();
  const [open, setOpen] = useState(false);
  const { getQuotations, getSingleQuotation, getQuotationSender } = useQuotation();

  const handleChange = () => {
    setOpen(false);
  };

  const getAllQuotations = async () => {
    try {
      const resp = await getQuotations();
      if (resp) {
        console.log(resp);
        setQuotations(resp.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSenderData = async (id) => {
    try {
      const resp = await getQuotationSender({ id });
      if (resp) {
        return resp.data;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSingleQuotationData = async (id) => {
    try {
      const resp = await getSingleQuotation(id);
      if (resp) {
        const quotationSender = await getSenderData(resp.data.userId);
        setQuotation(resp.data);
        setQuotationUser(quotationSender);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllQuotations();
  }, []);

  const onViewButtonClicked = (id) => {
    setOpen(true);
    getSingleQuotationData(id);
  };
  return (
    <div>
      <Helmet>
        <title> Quotations </title>
      </Helmet>
      <Container>
        <Typography variant="h4" gutterBottom>
          Quotations
        </Typography>
      </Container>
      
      {quotations?.length >= 0 && <QuotationTable data={quotations} onViewButtonClicked={onViewButtonClicked} />}

      {quotation && (
        
        <QuotationDetails handleChange={handleChange} open={open} data={quotation} quotationUser={quotationUser} />
      )}
    </div>
  );
};

export default PurchaserQuotations;
