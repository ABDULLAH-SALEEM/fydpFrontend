import { useEffect, useState } from 'react';
import { Grid, FormControl, TextField, Button, InputLabel, MenuItem, Modal, Box, Select } from '@mui/material';

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
  name: '',
  quantity: '',
  unit: '',
};
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

export default function AddProductsForm({ open, handleChange, onSubmit, loading }) {
  const schema = yup.object().shape({
    name: yup.string().required('Product name is a required field'),
    quantity: yup.number().required('Quantity is a required field'),
    unit: yup.string().required('Unit is a required field'),
  });

  const unitsArray = ['Kilogram (kg)', 'Ton (t)', 'Pound (lb)'];

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  return (
    <Modal open={open} onClose={handleChange}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={style}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <InputLabel>Product Name*</InputLabel>
              <FormControl fullWidth>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.name)}
                      placeholder={'E.G. Wheat grains'}
                    />
                  )}
                />
                {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Quantity</InputLabel>
              <FormControl fullWidth>
                <Controller
                  name="quantity"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      type="number"
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.quantity)}
                      placeholder={'10'}
                    />
                  )}
                />
                {errors.quantity && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.quantity.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <InputLabel>unit</InputLabel>
              <FormControl fullWidth>
                <Controller
                  name="unit"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select value={value} onChange={onChange} error={Boolean(errors.unit)} placeholder={'Tons'}>
                      <MenuItem value={''} disabled>
                        Choose unit
                      </MenuItem>
                      {unitsArray.map((unit, idx) => (
                        <MenuItem key={idx} value={unit}>
                          {unit}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.unit && <FormHelperText sx={{ color: 'error.main' }}>{errors.unit.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <LoaderButton
                showLoader={loading}
                disabled={loading}
                buttonProps={{ variant: 'contained', type: 'submit' }}
                text="Add product"
              />
            </Grid>
          </Grid>
        </Box>
      </form>
    </Modal>
  );
}
