import { Container, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuotation } from 'src/hooks/useQuotation';
import QuotationTable from './Components/quotationTable';
import QuotationDetails from './Components/quotationDetail';

const SellerQuotations = () => {
  const [quotations, setQuotations] = useState();
  const [quotation, setQuotation] = useState();
  const [quotationUser, setQuotationUser] = useState();
  const [open, setOpen] = useState(false);
  const { getUserQuotations, getSingleQuotation, getQuotationUser } = useQuotation();

  const handleChange = () => {
    setOpen(false);
  };

  const getAllQuotations = async () => {
    try {
      const resp = await getUserQuotations();
      if (resp) {
        console.log(resp);
        setQuotations(resp.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getQuotationUserData = async (email) => {
    try {
      const resp = await getQuotationUser({ email });
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
        const quotationUser = await getQuotationUserData(resp.data.sentTo);
        setQuotation(resp.data);
        setQuotationUser(quotationUser);
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

export default SellerQuotations;
