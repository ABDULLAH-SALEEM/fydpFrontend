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
import myABI from '../../../../contracts/Owner.json';
import { OwnerContractAddress } from 'src/contracts/Constants';
import Web3 from 'web3';
import { ethers } from 'ethers';

const AssignmentDetails = ({ handleClose, open, data, onClick }) => {
  const [loading, setLoading] = useState(false);
  const { updateOrder } = useOrder();
  const { showSnackBar } = useSnack();
  const { user } = useAuth();

  const web3 = new Web3(window.ethereum);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(OwnerContractAddress, myABI, signer);

  const { product, _id, quantity, deadline, assignedBy, orderId } = data;

  const sendOrderFromSupplierToSeller = async (orderId, to, from, transferTime) => {
    await window.ethereum.enable();
    const checkVar = await contract.fulfillOrder(orderId, to, from, transferTime);
    console.log(checkVar);
  };


  const onSubmit = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const resp = await updateOrder(orderId._id, { status: 'Ready to be Shipped' });
      if (resp) {
        const date = new Date();

        await sendOrderFromSupplierToSeller(orderId._id, data.assignedBy._id, user._id, date, toString());
        setLoading(false);
        showSnackBar('Assignment completed successfully', 'success');
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{'Assignment details'}</DialogTitle>
      <DialogContent style={{ minWidth: '600px' }}>
        <Stack direction={'row'} gap={2} mb={2} alignItems={'center'}>
          <Typography variant="body">Assignment id: </Typography>
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
          <Typography variant="body">Products: </Typography>
          <Typography variant="h6">{`${product} (${quantity} Tons(t))`}</Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        {orderId.status === 'preparing' && (
          <LoaderButton
            showLoader={loading}
            disabled={loading}
            text={'complete assignment'}
            buttonProps={{ variant: 'contained' }}
            onClick={onSubmit}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AssignmentDetails;
