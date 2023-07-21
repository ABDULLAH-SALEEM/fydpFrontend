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
import { ethers } from "ethers";
import AuthAbi from '../../../contracts/Auth.json'
import { AdminAuthContractAddress } from 'src/contracts/Constants';
// const ethers = require("ethers")
// ----------------------------------------------------------------------
// const contractAddress = '0x22b951317eD61B716F260eAf25D2287032a5ec8A'; // Replace with your contract address
// const contractABI =[
//     {
//       "inputs": [],
//       "stateMutability": "nonpayable",
//       "type": "constructor"
//     },
//     {
//       "inputs": [],
//       "name": "creationTime",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "enum admin_manufacture.Role",
//           "name": "role",
//           "type": "uint8"
//         }
//       ],
//       "name": "getRoleName",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "pure",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "userAddress",
//           "type": "address"
//         }
//       ],
//       "name": "getUser",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "firstname",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "lastname",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "companyName",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "email",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "number",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "password",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "roleName",
//           "type": "string"
//         },
//         {
//           "internalType": "address",
//           "name": "walletAddress",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "email",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "password",
//           "type": "string"
//         }
//       ],
//       "name": "getUserByEmailAndPassword",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "firstname",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "lastname",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "companyName",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "number",
//           "type": "string"
//         },
//         {
//           "internalType": "enum admin_manufacture.Role",
//           "name": "role",
//           "type": "uint8"
//         },
//         {
//           "internalType": "address",
//           "name": "walletAddress",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "owner",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "firstname",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "lastname",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "companyName",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "email",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "number",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "password",
//           "type": "string"
//         },
//         {
//           "internalType": "enum admin_manufacture.Role",
//           "name": "role",
//           "type": "uint8"
//         }
//       ],
//       "name": "registerUser",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "userCount",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "name": "users",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "firstname",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "lastname",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "companyName",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "email",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "number",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "password",
//           "type": "string"
//         },
//         {
//           "internalType": "enum admin_manufacture.Role",
//           "name": "role",
//           "type": "uint8"
//         },
//         {
//           "internalType": "address",
//           "name": "walletAddress",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     }
//   ]; // Replace with your contract ABI


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
// const contract = new ethers.Contract(contractAddress, contractABI, signer);



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

const signupContract = async () =>{
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
} else if (user.role === 'Distributor') {
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
    const userAddress = await web3.eth.getAccounts().then(accounts => accounts[0]);
    const result = await contract.getUser(userAddress);
    const [userFirstName, userLastName, userCompanyName, userEmail, userPhoneNumber, userPassword, userRole, walletAddress] = result;

console.log (userAddress);
    console.log('User registered successfully!');
    console.log('Role:', roleName);
    console.log('Wallet Address:', walletAddress);
storeData("blockchainUser", {roleName, userAddress})
  } catch (error) {
    console.error('Error registering user:', error);
  };
}


  const createAccount = async (data) => {
    if (data) {
      if (loading) return;
      setLoading(true);
      try {
        const user = retrieveData('user');
        // await signupContract();
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
