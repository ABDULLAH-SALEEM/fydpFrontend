import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Typography,
  Avatar,
  Button,
  TextField,
} from '@mui/material';
import LoaderButton from 'src/components/loader/LoaderButton';
import { storeData } from 'src/helper/storageHelper';
import { useAssignment } from 'src/hooks/useAssignment';
import { useSnack } from 'src/hooks/useSnack';
import { useOrder } from 'src/hooks/useOrder';
import { useAuth } from 'src/hooks/useAuth';
import { useShipment } from 'src/hooks/useShipment';

const DistributerDetails = ({ handleClose, open, data, onClick }) => {
  const [orderId, setOrderId] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [deadline, setDeadline] = useState();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const { createShipment } = useShipment();
  const { showSnackBar } = useSnack();

  const handleOrderId = (event) => {
    setOrderId(event.target.value);
  };

  const handleShipmentFrom = (event) => {
    setFrom(event.target.value);
  };
  const handleShipmentTo = (event) => {
    setTo(event.target.value);
  };

  const handleShipmentDeadline = (event) => {
    setDeadline(event.target.value);
  };

  const { products, address, number, email, firstname, lastname, companyName, ordersAssigned } = data;

  const onSubmit = async () => {
    if (!from || !to) return;
    if (loading) return;
    setLoading(true);
    try {
      const body = {
        orderId,
        userId: data._id,
        deadline,
        assignedBy: user._id,
        from,
        to,
      };
      const resp = await createShipment(body);
      if (resp) {
        setLoading(false);
        showSnackBar(resp.message, 'success');
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
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
          <Typography>Contact Number:</Typography>
          <Typography>{number}</Typography>
        </Stack>

        <Stack direction="row" gap={2} mb={2}>
          <Typography>Address:</Typography>
          <Typography>{address}</Typography>
        </Stack>
        <Stack direction="row" gap={2} mb={2}>
          <Typography>Assign shipment:</Typography>
          <TextField size="small" value={orderId} onChange={handleOrderId} placeholder="Enter order Id" />
        </Stack>
        <Stack direction="row" gap={2} mb={2}>
          <Typography>Form: </Typography>
          <TextField size="small" value={from} onChange={handleShipmentFrom} placeholder="Pick up address" />
        </Stack>
        <Stack direction="row" gap={2} mb={2}>
          <Typography>To: </Typography>
          <TextField size="small" value={to} onChange={handleShipmentTo} placeholder="Drop off address" />
        </Stack>
        <Stack direction="row" gap={2} mb={2}>
          <Typography>Date: </Typography>
          <TextField
            size="small"
            type="date"
            value={deadline}
            onChange={handleShipmentDeadline}
            placeholder="Drop off address"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <LoaderButton
          showLoader={loading}
          disabled={loading}
          text={'assign shipment'}
          buttonProps={{ variant: 'contained' }}
          onClick={onSubmit}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DistributerDetails;
