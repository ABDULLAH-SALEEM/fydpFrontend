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
  Select,
  MenuItem,
} from '@mui/material';
import LoaderButton from 'src/components/loader/LoaderButton';
import { storeData } from 'src/helper/storageHelper';
import { useAssignment } from 'src/hooks/useAssignment';
import { useSnack } from 'src/hooks/useSnack';
import { useOrder } from 'src/hooks/useOrder';
import { useAuth } from 'src/hooks/useAuth';

const ShipmentDetails = ({ handleClose, open, data, onClick }) => {
  const [loading, setLoading] = useState(false);
  const { updateOrder } = useOrder();
  const { showSnackBar } = useSnack();
  const [shipmentStatus, setShipmentStatus] = useState();

  const handleShipmentStatus = (event) => {
    setShipmentStatus(event.target.value);
  };

  const { _id, deadline, assignedBy, orderId, from, to } = data;

  const onStart = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const resp = await updateOrder(orderId._id, { status: 'In transit' });
      if (resp) {
        setLoading(false);
        showSnackBar('Shipment started successfully', 'success');
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const onComplete = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const resp = await updateOrder(orderId._id, { status: 'Shipped' });
      if (resp) {
        setLoading(false);
        showSnackBar('Shipment shipped successfully', 'success');
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const onUpdate = () => {
    if (shipmentStatus === 'started') {
      onStart();
    } else if (shipmentStatus === 'completed') {
      onComplete();
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{'Assignment details'}</DialogTitle>
      <DialogContent style={{ minWidth: '600px' }}>
        <Stack direction={'row'} gap={2} mb={2} alignItems={'center'}>
          <Typography variant="body">Shipmet id: </Typography>
          <Typography variant="h6">{_id}</Typography>
        </Stack>
        <Stack direction={'row'} gap={2} mb={2} alignItems={'center'}>
          <Typography variant="body">Assigned by: </Typography>
          <Typography variant="h6">{assignedBy.email}</Typography>
        </Stack>
        <Stack direction={'row'} gap={2} mb={2} alignItems={'center'}>
          <Typography variant="body">Status: </Typography>
          <Typography variant="h6">{orderId.status}</Typography>
        </Stack>
        <Stack direction={'row'} gap={2} mb={2} alignItems={'center'}>
          <Typography variant="body">Pickup: </Typography>
          <Typography variant="h6">{from}</Typography>
        </Stack>
        <Stack direction={'row'} gap={2} mb={2} alignItems={'center'}>
          <Typography variant="body">Drop off: </Typography>
          <Typography variant="h6">{to}</Typography>
        </Stack>
        <Stack direction={'row'} gap={2} mb={2} alignItems={'center'}>
          <Typography variant="body">Date</Typography>
          <Typography variant="h6">{deadline}</Typography>
        </Stack>

        {orderId.status !== 'Shipped' && (
          <Stack direction={'row'} gap={2} mb={2} alignItems={'center'}>
            <Select size="small" value={shipmentStatus} onChange={handleShipmentStatus}>
              <MenuItem value={''} disabled selected>
                {orderId.status}
              </MenuItem>
              <MenuItem value={'started'}>Started</MenuItem>
              <MenuItem value={'completed'}>Completed</MenuItem>
            </Select>
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        {orderId.status !== 'Shipped' && (
          <LoaderButton
            showLoader={loading}
            disabled={loading}
            text={'update shipment'}
            buttonProps={{ variant: 'contained' }}
            onClick={onUpdate}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ShipmentDetails;
