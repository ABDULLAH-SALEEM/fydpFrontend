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
import Web3 from 'web3';
import { ethers } from 'ethers';
import AuthAbi from '../../../contracts/Auth.json';
import { AdminAuthContractAddress } from 'src/contracts/Constants';

const defaultValues = {
  otp: '',
};
export default function OtpForm() {
  const navigate = useNavigate();
  const { showSnackBar } = useSnack();
  const [loading, setLoading] = useState();
  const { setUser } = useAuth();

  //web3 initialization
  const web3 = new Web3(window.ethereum);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(AdminAuthContractAddress, AuthAbi, signer);

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

  const signupContract = async () => {
    try {
      await window.ethereum.enable();
      const user = retrieveData('user');

      let roleValue;
      if (user.role === 'Seller') {
        roleValue = 0;
      } else if (user.role === 'Purchaser') {
        roleValue = 1;
      } else if (user.role === 'Supplier') {
        roleValue = 2;
      } else if (user.role === 'Distributer') {
        roleValue = 3;
      } else {
        console.error('Invalid role');
        return;
      }

      await contract.registerUser(
        user.firstname,
        user.lastname,
        user.companyName,
        user.email,
        user.number,
        user.password,
        roleValue
      );
      const roleName = await contract.getRoleName(roleValue);
      const userAddress = await web3.eth.getAccounts().then((accounts) => accounts[0]);
      console.log(userAddress);
      console.log('User registered successfully!');
      console.log('Role:', roleName);
      storeData('blockchainUser', { roleName, userAddress });
      return await contract.getUser(userAddress);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const createAccount = async (data) => {
    if (data) {
      if (loading) return;
      setLoading(true);
      try {
        const user = retrieveData('user');
        const blockchainResp = await signupContract();
        if (blockchainResp) {
          const resp = await axiosApi('post', '/auth/signup', { ...user, ...data });
          if (resp) {
            storeData('user', resp.data.user);
            setUser(resp.data.user);
            storeData('token', resp.data.token);
            showSnackBar(resp.message, 'success');
            setLoading(false);
            navigate('/dashboard/app', { replace: true });
          }
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
