import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { Link, Container, Typography } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
import { LoginForm } from '../../sections/auth/login';
import SignupForm from 'src/sections/auth/signup/SignupForm';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function SignUpPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Signup | AgroChain </title>
      </Helmet>
      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Typography sx={{ mb: 3 }} variant="h4" gutterBottom>
              Create new account
            </Typography>
            <SignupForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
