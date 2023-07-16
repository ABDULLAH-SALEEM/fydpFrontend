import { Avatar, Typography, Grid, Stack, TextField, Modal, Box, Select, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { removeData, retrieveData } from 'src/helper/storageHelper';
import { useAuth } from 'src/hooks/useAuth';
import LoaderButton from 'src/components/loader/LoaderButton';
import { useQuotation } from 'src/hooks/useQuotation';
import { useSnack } from 'src/hooks/useSnack';
import { useNavigate } from 'react-router-dom';
import { useInquiry } from 'src/hooks/useInquiry';
import { useOrder } from 'src/hooks/useOrder';

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

const OrderDetails = ({ data, open, handleChange, quotation }) => {

  return (
    <Modal open={open} onClose={handleChange}>
      <Box sx={style}>
        <Typography mb={1} variant="h6" component="h2">
          Order Details
        </Typography>

        <Stack direction={'row'} gap={1} alignItems={'center'} mb={2}>
          <Typography>Status: </Typography>
          <Typography>{data?.status}</Typography>
        </Stack>

        <Stack direction={'row'} gap={1} alignItems={'center'} mb={1}>
          <Typography>Order id: </Typography>
          <Typography>{data?._id}</Typography>
        </Stack>

        <Stack direction={'row'} gap={1} alignItems={'center'} mb={1}>
          <Typography>Seller: </Typography>
          <Typography>{data?.orderFrom}</Typography>
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
              <td>{quotation?.quantity}</td>
              <td>{quotation?.product}</td>
              <td>{quotation?.unitPrice / quotation?.quantity}</td>
              <td>{quotation?.unitPrice}</td>
            </tr>
          </table>
        </Grid>

        <Stack direction="column" gap={1} mt={2} alignItems={'flex-end'}>
          <Typography variant="body2"> subtotal: {quotation?.unitPrice}</Typography>
          <Typography variant="body2">
            Tax {(quotation.tax / quotation?.unitPrice) * 100}% : {quotation.tax}
          </Typography>
          <Typography variant="h6">Total : {quotation?.amount}</Typography>
        </Stack>
      </Box>
    </Modal>
  );
};

export default OrderDetails;
