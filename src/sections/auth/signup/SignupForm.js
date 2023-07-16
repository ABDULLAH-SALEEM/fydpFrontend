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
  MenuItem,
  Select,
} from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';
import LoaderButton from 'src/components/loader/LoaderButton';
import { useSnack } from 'src/hooks/useSnack';
import { axiosApi } from 'src/service/apiEnviornment';
import { storeData } from 'src/helper/storageHelper';
// ----------------------------------------------------------------------
const defaultValues = {
  firstname: '',
  lastname: '',
  number: '',
  role: '',
  companyName: '',
  password: '',
  email: '',
};
export default function SignupForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { showSnackBar } = useSnack();
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
    showConfirmPassword: false,
  });

  const schema = yup.object().shape({
    password: yup
      .string()
      .required('This field is required')
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        `${'Your password must be at least 8 characters long and contain at least one upper and one lowercase character and a number.'}`
      ),
    password_confirmation: yup
      .string()
      .label('This field is required')
      .required('This field is required')
      .oneOf([yup.ref('password'), null], 'Password must match'),
    email: yup.string().email().required('This field is required'),
    firstname: yup.string().required('This field is required'),
    lastname: yup.string().required('This field is required'),
    number: yup.number().required('This field is required'),
    companyName: yup.string().required('This field is required'),
    role: yup.string().required('This field is required'),
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
  const getOtp = async (data) => {
    if (data) {
      if (loading) return;
      setLoading(true);
      try {
        const resp = await axiosApi('post', '/auth/get-otp', { ...data });
        if (resp) {
          showSnackBar(resp.message, 'success');
          navigate('/verifyOtp');
          storeData('user', data);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        showSnackBar(err.message, 'error');
        setLoading(false);
      }
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };

  return (
    <>
      <Stack spacing={3} sx={{ mb: 3 }}>
        <form onSubmit={handleSubmit(getOtp)}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Controller
              name="firstname"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  autoFocus
                  value={value}
                  label={'Firstname'}
                  type="text"
                  onChange={onChange}
                  error={Boolean(errors.firstname)}
                />
              )}
            />
            {errors.firstname && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.firstname.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Controller
              name="lastname"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  autoFocus
                  value={value}
                  label={'Lastname'}
                  type="text"
                  onChange={onChange}
                  error={Boolean(errors.lastname)}
                />
              )}
            />
            {errors.lastname && <FormHelperText sx={{ color: 'error.main' }}>{errors.lastname.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Controller
              name="companyName"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  autoFocus
                  value={value}
                  label={'Company name'}
                  type="text"
                  onChange={onChange}
                  error={Boolean(errors.companyName)}
                />
              )}
            />
            {errors.companyName && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.companyName.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
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
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Controller
              name="number"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  value={value}
                  label={'Number'}
                  type="number"
                  onChange={onChange}
                  error={Boolean(errors.number)}
                />
              )}
            />
            {errors.number && <FormHelperText sx={{ color: 'error.main' }}>{errors.number.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Role</InputLabel>
            <Controller
              name="role"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Select value={value} label="Role" onChange={onChange}>
                  <MenuItem value={'Seller'}>Seller</MenuItem>
                  <MenuItem value={'Purchaser'}>Purchaser</MenuItem>
                  <MenuItem value={'Supplier'}>Supplier</MenuItem>
                  <MenuItem value={'Distributer'}>Distributer</MenuItem>
                </Select>
              )}
            />
            {errors.role && <FormHelperText sx={{ color: 'error.main' }}>{errors.role.message}</FormHelperText>}
          </FormControl>
          <Box>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => {
                  return (
                    <>
                      <InputLabel error={Boolean(errors.password)}>Password</InputLabel>
                      <OutlinedInput
                        label={'password'}
                        value={value}
                        placeholder={'Enter password'}
                        onChange={onChange}
                        error={Boolean(errors.password)}
                        type={values.showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword}>
                              {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </>
                  );
                }}
              />
              {errors.password && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth>
              <Controller
                name="password_confirmation"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => {
                  return (
                    <>
                      <InputLabel error={Boolean(errors.password_confirmation)}>{'Confirm password'}</InputLabel>
                      <OutlinedInput
                        label={'Confirm password'}
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors.password_confirmation)}
                        type={values.showConfirmPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton onClick={handleClickShowConfirmPassword}>
                              {values.showConfirmPassword ? <EyeOutline /> : <EyeOffOutline />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </>
                  );
                }}
              />
              {errors.password_confirmation && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.password_confirmation.message}</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box sx={{ mt: 3 }}>
            <LoaderButton
              showLoader={loading}
              disabled={loading}
              text={'Signup'}
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
            <Typography variant="body2">Already have an account?</Typography>

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
