import React, { useEffect, useState } from 'react';
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

const SupplierDetails = ({ handleClose, open, data, onClick }) => {
  const [orderId, setOrderId] = useState('');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const { createAssignment } = useAssignment();
  const { showSnackBar } = useSnack();
  const { updateOrder } = useOrder();

  const handleOrderId = (event) => {
    setOrderId(event.target.value);
  };

  const handleOrderDeadline = (event) => {
    setDeadline(event.target.value);
  };

  const { products, address, number, email, firstname, lastname, companyName, ordersAssigned } = data;

  //web3 initialization
  const web3 = new Web3(window.ethereum);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(OwnerContractAddress, myABI, signer);

  const transferToSupplier = async (ID, ToUser, FromUser, Time) => {
    await window.ethereum.enable();
    const checkVar = await contract.requestRawMaterials(ID, ToUser, FromUser, Time);
    console.log(checkVar);
  };

  const verifyTransfer = async (id) => {
    const checkVar2 = await contract.getOwnershipTransfersByOrder('64bbe4c04a8d2bcb8ebd7947');
    console.log(checkVar2);
  };

  // useEffect(() => {
  //   verifyTransfer();
  // }, []);

  const onSubmit = async () => {
    if (!orderId || !deadline) return;
    if (loading) return;
    setLoading(true);
    try {
      const body = {
        orderId,
        userId: data._id,
        deadline,
        assignedBy: user._id,
      };
      const resp = await createAssignment(body);

      if (resp) {
        const date = new Date();
        await transferToSupplier(orderId, data._id, user._id, date.toString());
        // await verifyTransfer()
        await updateOrder(orderId, { status: 'preparing' });
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
          <Typography>Products:</Typography>
          {products?.map(({ name, quantity, unit }, idx) => (
            <Typography key={idx}>{`${name} ${quantity} (${unit})`}</Typography>
          ))}
        </Stack>

        <Stack direction="row" gap={2} mb={2}>
          <Typography>Address:</Typography>
          <Typography>{address}</Typography>
        </Stack>
        <Stack direction="row" gap={2} mb={2}>
          <Typography>Orders Assigned:</Typography>
          <Typography>{ordersAssigned ? ordersAssigned : 'N/A'}</Typography>
        </Stack>
        <Stack direction="row" gap={2} mb={2}>
          <Typography>Assign order:</Typography>
          <TextField size="small" value={orderId} onChange={handleOrderId} placeholder="Enter order Id" />
        </Stack>
        <Stack direction="row" gap={2} mb={2}>
          <Typography>Assignment Deadline:</Typography>
          <TextField
            size="small"
            value={deadline}
            onChange={handleOrderDeadline}
            type="date"
            placeholder="Enter assignment deadline"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <LoaderButton
          showLoader={loading}
          disabled={loading}
          text={'assign order'}
          buttonProps={{ variant: 'contained' }}
          // onClick={onSubmit}
          onClick={verifyTransfer 
          //   () =>{
          //   verifyTransfer('64ba8f9549600e42e0b43cea')
          // }
          
        }
        />
      </DialogActions>
    </Dialog>
  );
};

export default SupplierDetails;
