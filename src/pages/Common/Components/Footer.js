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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus vitae turpis sit amet pulvinar. Sed vitae
          urna ultrices, malesuada est sed, posuere orci. Mauris nec diam mauris. Vestibulum molestie nulla et urna
          iaculis, eget dignissim ante sodales. Ut lobortis, leo varius ultricies feugiat, libero sem auctor leo, at
          maximus purus lectus at justo. Nam suscipit, enim in semper tempus, eros dolor maximus lacus, a pulvinar
          turpis turpis in purus. Nulla rhoncus ligula finibus venenatis sodales.
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
