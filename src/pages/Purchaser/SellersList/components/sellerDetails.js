import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Stack, Typography, Avatar, Button } from '@mui/material';
import LoaderButton from 'src/components/loader/LoaderButton';
import { storeData } from 'src/helper/storageHelper';

const SellerDetails = ({ handleClose, open, data, onClick }) => {
  const { product, ratings, address, number, email, firstname, lastname, description, companyName } = data;
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{'Details'}</DialogTitle>
      <DialogContent style={{ minWidth: '600px' }}>
        <Stack direction="row" gap={2}>
          <Avatar />
          <Stack direction="column" mb={5}>
            <Typography>{firstname + ' ' + lastname}</Typography>
            <Typography variant="caption">{email}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" gap={2} mb={2}>
          <Typography>Company:</Typography>
          <Typography variant="h6">{companyName}</Typography>
        </Stack>
        <Stack direction="row" gap={2} mb={2}>
          <Typography>Ratings:</Typography>
          <Typography>{ratings ? ratings : 'N/A'}</Typography>
        </Stack>

        <Stack direction="row" gap={2} mb={2}>
          <Typography>Contact Number:</Typography>
          <Typography>{number}</Typography>
        </Stack>
        <Stack direction="row" gap={2} mb={2}>
          <Typography>Products:</Typography>
          <Typography>Rice, wheat</Typography>
        </Stack>

        <Stack direction="row" gap={2} mb={2}>
          <Typography>Address:</Typography>
          <Typography>{address}</Typography>
        </Stack>
        <Typography>Description</Typography>
        <Typography>We deliever high quality products</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClick}>
          Send Inquiry
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SellerDetails;
