import { Grid, Stack, Avatar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <Grid pl={10} pr={10}>
      <Grid
        sx={{
          width: '100%',
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Grid width={55} height={55}>
          <img src="assets/images/logo.png" width={'100%'} />
        </Grid>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={5}>
          <Grid>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={5}>
              <Grid sx={{ cursor: 'pointer' }}>
                <Typography fontWeight={600} color="primary">
                  Features
                </Typography>
              </Grid>
              <Grid sx={{ cursor: 'pointer' }}>
                <Typography fontWeight={600} color="primary">
                  About us
                </Typography>
              </Grid>
              <Grid sx={{ cursor: 'pointer' }}>
                <Typography fontWeight={600} color="primary">
                  Contact us
                </Typography>
              </Grid>
              <Grid sx={{ cursor: 'pointer' }}>
                <Typography fontWeight={600} color="primary">
                  Support
                </Typography>
              </Grid>
            </Stack>
          </Grid>
          <Grid>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} gap={1}>
              <Grid>
                <Avatar sx={{ cursor: 'pointer' }} />
              </Grid>
              <Grid sx={{ cursor: 'pointer' }} onClick={() => navigate('/signin')}>
                Sign in
              </Grid>
              <Grid>|</Grid>
              <Grid sx={{ cursor: 'pointer' }} onClick={() => navigate('/signup')}>Join Free</Grid>
            </Stack>
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
}
