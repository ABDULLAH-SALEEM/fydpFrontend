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
import myABI from '../../../../contracts/Owner.json';
import { OwnerContractAddress } from 'src/contracts/Constants';
import Web3 from 'web3';
import { ethers } from 'ethers';

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
  const { user } = useAuth();
  const [status, setStatus] = useState(data?.status);
  const [notes, setNotes] = useState(data?.notes);
  const [loading, setLoading] = useState(false);
  const { updateQuotation } = useQuotation();
  const { createOrder } = useOrder();
  const { showSnackBar } = useSnack();
  const navigate = useNavigate();

  console.log(data);
  //web3 initialization
  const web3 = new Web3(window.ethereum);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(OwnerContractAddress, myABI, signer);

  const createBlockChainOrder = async (ID) => {
    await window.ethereum.enable();
    const checkVar = await contract.createPayOrder(ID);
    console.log(checkVar);
  };

  const sendOrderFromPurchaserToSeller = async (orderId, to, from, transferTime) => {
    await window.ethereum.enable();
    const checkVar = await contract.sendPayOrderToExporter(orderId, to, from, transferTime);
    console.log(checkVar);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const onUpdateQuotation = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const newData = {
        status,
        notes,
      };
      const resp = await updateQuotation(data?._id, newData);
      if (resp) {
        setLoading(false);
        showSnackBar(resp.message, 'success');
        navigate('/dashboard/quotations');
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const onCreateOrder = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const newData = {
        quotationId: data?._id,
        orderFrom: quotationUser?.email,
      };
      const updatedQuotation = {
        status,
      };
      updateQuotation(data?._id, updatedQuotation);
      const resp = await createOrder(newData);
      if (resp) {
        const date = new Date();
        await createBlockChainOrder(resp.data._id);
        await sendOrderFromPurchaserToSeller(resp.data._id, data.userId, user._id, date.toString());
        setLoading(false);
        showSnackBar(resp.message, 'success');
        navigate('/dashboard/orders');
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const onSubmit = () => {
    if (status === 'need modification') {
      onUpdateQuotation();
    } else {
      onCreateOrder();
    }
  };

  return (
    <Modal open={open} onClose={handleChange}>
      <Box sx={style}>
        <Typography id="modal-modal-title" mb={2} variant="h6" component="h2">
          Quotation Details
        </Typography>
        <Grid>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="column" gap={1}>
              <Typography variant="h6">{quotationUser?.companyName}</Typography>
              <Typography variant="body2">{quotationUser?.email}</Typography>
              <Typography variant="body2">{quotationUser?.address}</Typography>
              <Typography variant="body2">{quotationUser?.number}</Typography>
            </Stack>
            <Grid>
              <Typography variant="h6">Quotation</Typography>
              <Select size="small" value={status} onChange={handleStatusChange}>
                <MenuItem value={'created'} disabled>
                  Created
                </MenuItem>
                <MenuItem value={'need modification'}>Need Modification</MenuItem>
                <MenuItem value={'accepted'}>Accepted</MenuItem>
              </Select>
            </Grid>
          </Stack>

          <Stack direction="column" gap={1} mt={2}>
            <Typography variant="h4"> Purchaser Details</Typography>
            <Typography variant="h6">{user?.companyName}</Typography>
            <Typography variant="body2">{user?.address}</Typography>
            <Typography variant="body2">{user?.email}</Typography>
            <Typography variant="body2">{user?.number}</Typography>
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
                <td>{data?.unitPrice / data?.quantity}</td>
                <td>{data?.unitPrice}</td>
              </tr>
            </table>
          </Grid>

          <Stack direction="column" gap={1} mt={2} alignItems={'flex-end'}>
            <Typography variant="body2"> subtotal: {data?.unitPrice}</Typography>
            <Typography variant="body2">
              Tax {(data.tax / data?.unitPrice) * 100}% : {data.tax}
            </Typography>
            <Typography variant="h6">Total : {data?.amount}</Typography>
          </Stack>
        </Grid>
        <Grid mb={1} mt={1}>
          {status === 'need modification' && (
            <TextField
              value={notes}
              onChange={handleNotesChange}
              fullWidth
              name="notes"
              multiline
              minRows={3}
              placeholder="Please specify modification details."
            />
          )}
        </Grid>
        <Grid>
          {data?.status !== 'accepted' && (
            <LoaderButton text={'update'} buttonProps={{ variant: 'contained' }} onClick={onSubmit} />
          )}
        </Grid>
      </Box>
    </Modal>
  );
};

export default QuotationDetails;
