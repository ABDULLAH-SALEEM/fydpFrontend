import { Avatar, Typography, Grid, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './quotes.css';
import { removeData, retrieveData } from 'src/helper/storageHelper';
import { useAuth } from 'src/hooks/useAuth';
import LoaderButton from 'src/components/loader/LoaderButton';
import { useQuotation } from 'src/hooks/useQuotation';
import { useSnack } from 'src/hooks/useSnack';
import { useNavigate } from 'react-router-dom';
import { useInquiry } from 'src/hooks/useInquiry';

const QuotationDesign = () => {
  const [purchaserData, setPurchaserData] = useState();
  const [dynamicCal, setDynamicCal] = useState({
    price: '',
    subtotal: '',
    taxAmount: '',
    total: '',
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { createQuotation } = useQuotation();
  const { updateInquiry } = useInquiry();
  const { showSnackBar } = useSnack();
  useEffect(() => {
    const data = retrieveData('quotationSendTo');
    setPurchaserData(data);
  }, []);

  const onUnitPriceChange = (e) => {
    const unitPrice = e.target.value;
    setDynamicCal({
      taxAmount: '',
      total: '',
      price: unitPrice * purchaserData.quantity,
      subtotal: unitPrice * purchaserData.quantity,
    });
  };

  const onTaxPriceChange = (e) => {
    const taxPercentage = e.target.value;
    setDynamicCal({
      ...dynamicCal,
      taxAmount: dynamicCal.subtotal * (taxPercentage / 100),
      total: dynamicCal.subtotal + dynamicCal.subtotal * (taxPercentage / 100),
    });
  };

  const onCreateQuotation = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const data = {
        amount: dynamicCal.total,
        notes: '',
        sentTo: purchaserData.email,
        product: purchaserData.product,
        quantity: purchaserData.quantity,
        tax: dynamicCal.taxAmount,
        unitPrice:dynamicCal.subtotal ,
      };
      const resp = await createQuotation(data);
      if (resp) {
        await updateInquiry(purchaserData._id, { status: 'Answered' });
        setLoading(false);
        showSnackBar(resp.message, 'success');
        removeData('quotationSendTo');
        navigate('/dashboard/quotations');
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <Grid>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="column" gap={1}>
          <Typography variant="h6">{user?.companyName}</Typography>
          <Typography variant="body2">{user?.address}</Typography>
          <Typography variant="body2">{user?.email}</Typography>
          <Typography variant="body2">{user?.number}</Typography>
        </Stack>
        <Typography variant="h6">Quotation</Typography>
      </Stack>

      <Stack direction="column" gap={1} mt={2}>
        <Typography variant="h4"> Purchaser Details</Typography>
        <Typography variant="body2">{purchaserData?.name}</Typography>
        <Typography variant="body2">{purchaserData?.email}</Typography>
        <Typography variant="body2">{purchaserData?.address}</Typography>
        <Typography variant="body2">{purchaserData?.phoneNumber}</Typography>
      </Stack>

      <Grid className="table" mt={2}>
        <table>
          <tr>
            <th>Quantity</th>
            <th>Description</th>
            <th>Unit Price</th>
            <th>Amount (pkr)</th>
          </tr>
          <tr>
            <td>{purchaserData?.quantity}</td>
            <td>{purchaserData?.product}</td>
            <td>
              <TextField name="unitPrice" onChange={onUnitPriceChange} size="small" />
            </td>
            <td>{dynamicCal.price}</td>
          </tr>
          {/* <tr>
            <td>2</td>
            <td>Rice</td>
            <td>100</td>
            <td>200</td>
          </tr> */}
          {/* <tr>
            <td>Ernst Handel</td>
            <td>Roland Mendel</td>
            <td>Austria</td>
          </tr>
          <tr>
            <td>Island Trading</td>
            <td>Helen Bennett</td>
            <td>UK</td>
          </tr>
          <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Yoshi Tannamuri</td>
            <td>Canada</td>
          </tr>
          <tr>
            <td>Magazzini Alimentari Riuniti</td>
            <td>Giovanni Rovelli</td>
            <td>Italy</td>
          </tr> */}
        </table>
      </Grid>

      <Stack direction="column" gap={1} mt={2} alignItems={'flex-end'}>
        <Typography variant="body2"> subtotal: {dynamicCal.subtotal} </Typography>
        <Typography variant="body2">
          Tax <TextField size="small" name="tax" onChange={onTaxPriceChange} />: {dynamicCal.taxAmount}
        </Typography>
        <Typography variant="h6">Total:{dynamicCal.total}</Typography>
      </Stack>
      <LoaderButton
        showLoader={loading}
        disabled={loading}
        onClick={onCreateQuotation}
        text={'create quotation'}
        buttonProps={{ variant: 'contained' }}
      />
    </Grid>
  );
};

export default QuotationDesign;
