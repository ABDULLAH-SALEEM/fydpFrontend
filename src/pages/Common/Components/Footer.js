import { Grid, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFooter = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  backgroundColor: theme.palette.primary.main,
  paddingTop: '20px',
  paddingBottom: '10px',
}));

export default function Footer() {
  return (
    <StyledFooter>
      <Grid sx={{ width: '30%' }}>
        <Typography variant="h3" sx={{ my: 2, color: 'white' }}>
          AgroChain
        </Typography>
        <Typography sx={{ color: 'white' }}>
          AgroChain is a cutting-edge web application that revolutionizes the integrated supply chain model, making
          agricultural trade more efficient, transparent, and secure. With a focus on security and accountability,
          AgroChain implements blockchain technology and redefines how the agricultural industry manages its supply
          chain, setting new standards for reliability and innovation.
        </Typography>
      </Grid>
      <Grid>
        <Stack>
          <Typography variant="h5" sx={{ marginBottom: 5, color: 'white' }}>
            Site
          </Typography>
          <Typography sx={{ lineHeight: 2, color: 'white' }}>Features</Typography>
          <Typography sx={{ lineHeight: 2, color: 'white' }}>About us</Typography>
          <Typography sx={{ lineHeight: 2, color: 'white' }}>Contact us</Typography>
          <Typography sx={{ lineHeight: 2, color: 'white' }}>Join Free</Typography>
        </Stack>
      </Grid>
      <Grid>
        <Stack>
          <Typography variant="h5" sx={{ marginBottom: 5, color: 'white' }}>
            Policy
          </Typography>
          <Typography sx={{ lineHeight: 2, color: 'white' }}>Privacy</Typography>
          <Typography sx={{ lineHeight: 2, color: 'white' }}>Terms and Conditions</Typography>
          <Typography sx={{ lineHeight: 2, color: 'white' }}>About Us</Typography>
          <Typography sx={{ lineHeight: 2, color: 'white' }}>Support</Typography>
        </Stack>
      </Grid>
      <Grid></Grid>
    </StyledFooter>
  );
}
