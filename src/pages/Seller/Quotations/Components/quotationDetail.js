import { Avatar, Typography, Grid, Stack, TextField, Modal, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './quotes.css';
import { removeData, retrieveData } from 'src/helper/storageHelper';
import { useAuth } from 'src/hooks/useAuth';
import LoaderButton from 'src/components/loader/LoaderButton';
import { useQuotation } from 'src/hooks/useQuotation';
import { useSnack } from 'src/hooks/useSnack';
import { useNavigate } from 'react-router-dom';
import { useInquiry } from 'src/hooks/useInquiry';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  maxHeight: '85%',
  overflow: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const QuotationDetails = ({ data, open, handleChange, quotationUser }) => {
    console.log(data)
  const { user } = useAuth();

  return (
    <Modal open={open} onClose={handleChange}>
      <Box sx={style}>
        <Typography id="modal-modal-title" mb={2} variant="h6" component="h2">
          Quotation Details
        </Typography>
        <Grid>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="column" gap={1}>
              <Typography variant="h6">{user?.companyName}</Typography>
              <Typography variant="body2">{user?.address}</Typography>
              <Typography variant="body2">{user?.email}</Typography>
              <Typography variant="body2">{user?.number}</Typography>
            </Stack>
            <Grid>
              <Typography variant="h6">Quotation</Typography>
              <Typography variant="body2">{data?.status}</Typography>
            </Grid>
          </Stack>

          <Stack direction="column" gap={1} mt={2}>
            <Typography variant="h4"> Purchaser Details</Typography>
            <Typography variant="body2">{quotationUser?.firstname+" "+quotationUser?.lastname}</Typography>
            <Typography variant="body2">{quotationUser?.email}</Typography>
            <Typography variant="body2">{quotationUser?.address}</Typography>
            <Typography variant="body2">{quotationUser?.number}</Typography>
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
                <td>{data?.quantity}</td>
                <td>{data?.product}</td>
                <td>
                  {/* <TextField name="unitPrice" onChange={onUnitPriceChange} size="small" /> */}
                  {data?.unitPrice/data?.quantity}
                </td>
                <td>{data?.unitPrice}</td>
              </tr>
            </table>
          </Grid>

          <Stack direction="column" gap={1} mt={2} alignItems={'flex-end'}>
            <Typography variant="body2"> subtotal: {data?.unitPrice}</Typography>
            <Typography variant="body2">
              Tax {(data.tax/data?.unitPrice)*100}% : {/* <TextField size="small" name="tax" onChange={onTaxPriceChange} />:  */}{data.tax}
            </Typography>
            <Typography variant="h6">Total : {data?.amount}</Typography>
          </Stack>
        </Grid>
      </Box>
    </Modal>
  );
};

export default QuotationDetails;
