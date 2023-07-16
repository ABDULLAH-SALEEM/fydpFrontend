import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Stack, Typography, Avatar, Button } from '@mui/material';
import LoaderButton from 'src/components/loader/LoaderButton';
import { useAuth } from 'src/hooks/useAuth';

const InquiryDetails = ({ handleClose, open, data, onQuotationButtonClicked }) => {
  const { user } = useAuth();
  const { product, quantity, address, phoneNumber, email, name, req, status } = data;
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{'Details'}</DialogTitle>
      <DialogContent style={{ minWidth: '600px' }}>
        <Stack direction="row" gap={2}>
          <Avatar />
          <Stack direction="column" mb={5}>
            <Typography>{name}</Typography>
            <Typography variant="caption">{email}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" gap={2} mb={2}>
          <Typography>Product:</Typography>
          <Typography>{product}</Typography>
        </Stack>

        <Stack direction="row" gap={2} mb={2}>
          <Typography>Quantity:</Typography>
          <Typography>{quantity}</Typography>
        </Stack>

        <Stack direction="row" gap={2} mb={2}>
          <Typography>Address:</Typography>
          <Typography>{address}</Typography>
        </Stack>
        <Stack direction="row" gap={2} mb={2}>
          <Typography>Phone number:</Typography>
          <Typography>{phoneNumber}</Typography>
        </Stack>

        <Typography>Additional Equirenments:</Typography>
        <Typography>{req}</Typography>
      </DialogContent>
      <DialogActions>
        {user.role !== 'Purchaser' &&
          status !==
            'answered'&&(
              <Button variant="contained" onClick={onQuotationButtonClicked}>
                Send quotation
              </Button>
            )}
      </DialogActions>
    </Dialog>
  );
};

export default InquiryDetails;
