import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  InputLabel,
  FormControl,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Stack,
  Typography,
  Link,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from 'mdi-material-ui/Eye';
import VisibilityOff from 'mdi-material-ui/EyeOff';
import LoaderButton from 'src/components/loader/LoaderButton';
import { axiosApi } from 'src/service/apiEnviornment';
import { useAuth } from 'src/hooks/useAuth';
import { storeData } from 'src/helper/storageHelper';
import Web3 from 'web3';
import { ethers } from 'ethers';
import AuthAbi from '../../../contracts/Auth.json';
import { AdminAuthContractAddress } from 'src/contracts/Constants';

const defaultValues = {
  password: '',
  email: '',
};
export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();

  //web3 initialization
  const web3 = new Web3(window.ethereum);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(AdminAuthContractAddress, AuthAbi, signer);

  const schema = yup.object().shape({
    email: yup.string().email().required('This field is required'),
    password: yup.string().min(5).required('This field is required'),
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

  const blockChainLogin = async (data) => {
    try {
      await window.ethereum.enable();
      const user = await contract.getUserByEmailAndPassword(data.email, data.password);
      console.log('Logged in successfully!', user);
      return user;
    } catch (err) {
      console.log(err);
    }
  };

  const onLogin = async (data) => {
    if (data) {
      try {
        const resp = await blockChainLogin(data);
        if (resp) {
          await login(data);
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    }
  };
  return (
    <>
      <Stack spacing={3} sx={{ mb: 3 }}>
        <form onSubmit={handleSubmit(onLogin)}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  autoFocus
                  value={value}
                  label={'Email'}
                  type="email"
                  onChange={onChange}
                  error={Boolean(errors.email)}
                />
              )}
            />
            {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
          </FormControl>

          <Box>
            <FormControl fullWidth>
              <InputLabel error={Boolean(errors.password)}>Password</InputLabel>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <OutlinedInput
                    onBlur={onBlur}
                    value={value}
                    label={'Password'}
                    onChange={onChange}
                    error={Boolean(errors.password)}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />
              {errors.password && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box sx={{ mt: 3 }}>
            <LoaderButton
              showLoader={loading}
              disabled={loading}
              text={'Login'}
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
            <Typography variant="body2">Don't have an account?</Typography>

            <Typography variant="body2" sx={{ ml: 1, cursor: 'pointer' }}>
              <Link style={{ textDecoration: 'none' }} onClick={() => navigate('/signup')}>
                <Typography color="primary">Signup</Typography>
              </Link>
            </Typography>
          </Box>
        </form>
      </Stack>
    </>
  );
}
