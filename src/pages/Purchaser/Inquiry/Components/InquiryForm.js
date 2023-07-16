import { useEffect, useState } from 'react';
import { Grid, FormControl, TextField, Button, InputLabel } from '@mui/material';

import { useForm, Controller } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import LoaderButton from 'src/components/loader/LoaderButton';
import { useAuth } from 'src/hooks/useAuth';
import { removeData, retrieveData } from 'src/helper/storageHelper';
import { useInquiry } from 'src/hooks/useInquiry';
import { useSnack } from 'src/hooks/useSnack';
import { useNavigate } from 'react-router-dom';

let defaultValues = {
  req: '',
  email: '',
  phoneNumber: '',
  quantity: '',
  address: '',
  product: '',
};

export default function BuyRequirementsForm() {
  const schema = yup.object().shape({
    product: yup.string().required('Product name is a required field'),
    req: yup.string().required('Description is a required field'),
    email: yup.string().email('Invalid email'),
    phoneNumber: yup.string().required('Phone number is a required field'),
    quantity: yup.string().required('Quantity is a required field'),
    address: yup.string().required('Address is a required field'),
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuth();
  const { createInquiry } = useInquiry();
  const { showSnackBar } = useSnack();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const { email } = retrieveData('inquirySendTo');
      const newData = { ...data, userId: user._id, sentTo: email };
      if (loading) return;
      setLoading(true);
      const resp = await createInquiry(newData);
      if (resp) {
        removeData('inquirySendTo');
        showSnackBar(resp.message, 'success');
        setLoading(false);
        navigate('/dashboard/inquiry');
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      showSnackBar(err, 'success');
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <InputLabel>Product Name*</InputLabel>
          <FormControl fullWidth>
            <Controller
              name="product"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.product)}
                  placeholder={'E.G. Wheat grains'}
                />
              )}
            />
            {errors.product && <FormHelperText sx={{ color: 'error.main' }}>{errors.product.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Describe your requirements*</InputLabel>
          <FormControl fullWidth>
            <Controller
              name="req"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.req)}
                  multiline
                  minRows={2}
                  placeholder={
                    'Please include product name, quantity, address, and any special instructions if any in your inquiry request.'
                  }
                />
              )}
            />
            {errors.req && <FormHelperText sx={{ color: 'error.main' }}>{errors.req.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel>Quantity*</InputLabel>
          <FormControl fullWidth>
            <Controller
              name="quantity"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.quantity)}
                  placeholder={'E.G. 10 Tons'}
                />
              )}
            />
            {errors.quantity && <FormHelperText sx={{ color: 'error.main' }}>{errors.quantity.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel>Address*</InputLabel>
          <FormControl fullWidth>
            <Controller
              name="address"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.address)}
                  placeholder={'UAE Dubai'}
                />
              )}
            />
            {errors.address && <FormHelperText sx={{ color: 'error.main' }}>{errors.address.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel>Email*</InputLabel>
          <FormControl fullWidth>
            <Controller
              name="email"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  disabled
                  value={user.email}
                  onChange={onChange}
                  error={Boolean(errors.email)}
                  placeholder={'example@gmail.com'}
                />
              )}
            />
            {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel>Phone Number*</InputLabel>
          <FormControl fullWidth>
            <Controller
              name="phoneNumber"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.phoneNumber)}
                  placeholder={'E.G. +92 xxxxxxxxxx'}
                />
              )}
            />
            {errors.phoneNumber && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.phoneNumber.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <LoaderButton
            showLoader={loading}
            disabled={loading}
            buttonProps={{ variant: 'contained', type: 'submit' }}
            text="Send inquiry"
          />
        </Grid>
      </Grid>
    </form>
  );
}
