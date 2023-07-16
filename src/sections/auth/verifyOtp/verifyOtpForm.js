import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, FormControl, Stack, Typography, Link } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import LoaderButton from 'src/components/loader/LoaderButton';
import OtpCountdown from 'src/components/OtpCountDown';
import { axiosApi } from 'src/service/apiEnviornment';
import { retrieveData, storeData } from 'src/helper/storageHelper';
import { useSnack } from 'src/hooks/useSnack';
import { useAuth } from 'src/hooks/useAuth';
// ----------------------------------------------------------------------
const defaultValues = {
  otp: '',
};
export default function OtpForm() {
  const navigate = useNavigate();
  const { showSnackBar } = useSnack();
  const [loading, setLoading] = useState();
  const { setUser } = useAuth();

  const schema = yup.object().shape({
    otp: yup.string().required('This field is required'),
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const createAccount = async (data) => {
    if (data) {
      if (loading) return;
      setLoading(true);
      try {
        const user = retrieveData('user');
        const resp = await axiosApi('post', '/auth/signup', { ...user, ...data });
        if (resp) {
          
          storeData('user', resp.data.user);
          setUser(resp.data.user);
          storeData('token', resp.data.token);
          showSnackBar(resp.message, 'success');
          setLoading(false);
          navigate('/dashboard/app', { replace: true })
        }
      } catch (err) {
        showSnackBar(err, 'error');
        setLoading(false);
      }
    }
  };
  return (
    <>
      <Stack spacing={3} sx={{ mb: 3 }}>
        <form onSubmit={handleSubmit(createAccount)}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Controller
              name="otp"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  autoFocus
                  value={value}
                  label={'Otp'}
                  type="string"
                  onChange={onChange}
                  error={Boolean(errors.otp)}
                />
              )}
            />
            {errors.otp && <FormHelperText sx={{ color: 'error.main' }}>{errors.otp.message}</FormHelperText>}
          </FormControl>
          <Box>
            <OtpCountdown />
          </Box>
          <Box sx={{ mt: 3 }}>
            <LoaderButton
              showLoader={loading}
              text={'Verify'}
              disabled={loading}
              loadingText={'Loading'}
              buttonProps={{
                fullWidth: true,
                variant: 'contained',
                type: 'submit',
              }}
              loaderProps={{ color: 'inherit' }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
              mt: 1,
            }}
          >
            <Typography variant="body2">Back to</Typography>
            <Typography variant="body2" sx={{ ml: 1, cursor: 'pointer' }}>
              <Link style={{ textDecoration: 'none' }} onClick={() => navigate('/')}>
                <Typography color="primary">Login</Typography>
              </Link>
            </Typography>
          </Box>
        </form>
      </Stack>
    </>
  );
}
