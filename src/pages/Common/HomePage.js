import React from 'react';
import { Grid, Typography, Button, Stack, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import FeaturesCard from './Components/FeatureCard';
import Section4 from './Components/Section4';
import Section3 from './Components/Section3';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';

const HeroBanner = styled(CardContent)(({ url }) => ({
  backgroundImage: `url(${url})`,
  backgroundSize: '100% 100%',
  height: '800px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ContactUs = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.main,
}));

const HomePage = () => {
  return (
    <Grid>
      <Navbar />
      <HeroBanner url={'/assets/images/herobanner.jpeg'}>
        <Grid sx={{ marginTop: -20, marginBottom: 5 }}>
          <Typography variant="h1" color="primary">
            AGRO CHAIN
          </Typography>
        </Grid>
        <Grid sx={{ marginBottom: 10 }}>
          <Typography variant="h5" color="white">
            "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
          </Typography>
        </Grid>
        <Stack alignItems="center" flexWrap="wrap" justifyContent="center" direction="row" spacing={7}>
          <Button variant="contained" sx={{ height: 50 }}>
            Neque porro
          </Button>
          <Button variant="outlined" sx={{ height: 50 }}>
            Neque porro
          </Button>
        </Stack>
      </HeroBanner>

      <Grid sx={{ marginTop: -15 }}>
        <Stack alignItems="center" flexWrap="wrap" justifyContent="center" direction="row" spacing={7}>
          <FeaturesCard />
          <FeaturesCard />
          <FeaturesCard />
        </Stack>
      </Grid>

      <Stack
        sx={{ marginTop: 20, marginBottom: 20 }}
        alignItems="center"
        flexWrap="wrap"
        justifyContent="center"
        direction="row"
        spacing={40}
      >
        <Grid sx={{ width: '25%' }}>
          <Typography sx={{ marginBottom: 3 }}>Lorem Ipsum</Typography>
          <Typography sx={{ marginBottom: 3 }} variant="h3">
            Neque porro quisquam est qui dolorem
          </Typography>
          <Typography sx={{ marginBottom: 3 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus vitae turpis sit amet pulvinar. Sed
            vitae urna ultrices, malesuada est sed, posuere orci.
          </Typography>
          <Button variant="contained">Lorem Ipsum</Button>
        </Grid>
        <Grid sx={{ width: '25%' }}>
          <img width={'100%'} src="https://oceanking.com.pk/wp-content/uploads/2021/10/Rectangle-594-1-1024x860.jpg" />
        </Grid>
      </Stack>

      <Stack
        sx={{ marginTop: 20, marginBottom: 20 }}
        alignItems="center"
        flexWrap="wrap"
        justifyContent="center"
        direction="row"
        spacing={40}
      >
        <Grid sx={{ width: '25%' }}>
          <img width={'100%'} src="https://oceanking.com.pk/wp-content/uploads/2021/10/Rectangle-594-1-1024x860.jpg" />
        </Grid>
        <Grid sx={{ width: '25%' }}>
          <Typography sx={{ marginBottom: 3 }}>Lorem Ipsum</Typography>
          <Typography sx={{ marginBottom: 3 }} variant="h3">
            Neque porro quisquam est qui dolorem
          </Typography>
          <Typography sx={{ marginBottom: 3 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus vitae turpis sit amet pulvinar. Sed
            vitae urna ultrices, malesuada est sed, posuere orci.
          </Typography>
          <Button variant="contained">Lorem Ipsum</Button>
        </Grid>
      </Stack>

      <Stack
        sx={{ marginTop: 20, marginBottom: 20 }}
        alignItems="center"
        flexWrap="wrap"
        justifyContent="center"
        direction="row"
        spacing={40}
      >
        <Grid sx={{ width: '25%' }}>
          <Typography sx={{ marginBottom: 3 }}>Lorem Ipsum</Typography>
          <Typography sx={{ marginBottom: 3 }} variant="h3">
            Neque porro quisquam est qui dolorem
          </Typography>
          <Typography sx={{ marginBottom: 3 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus vitae turpis sit amet pulvinar. Sed
            vitae urna ultrices, malesuada est sed, posuere orci.
          </Typography>
          <Button variant="contained">Lorem Ipsum</Button>
        </Grid>
        <Grid sx={{ width: '25%' }}>
          <img width={'100%'} src="https://oceanking.com.pk/wp-content/uploads/2021/10/Rectangle-594-1-1024x860.jpg" />
        </Grid>
      </Stack>

      {/* <Section3 /> */}
      <ContactUs>
        <Grid>
          <Stack
            sx={{ marginTop: 20, marginBottom: 20 }}
            alignItems="center"
            flexWrap="wrap"
            justifyContent="center"
            direction="row"
            spacing={10}
          >
            <Grid sx={{ width: '40%' }}>
              <Typography variant="h4">
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
              </Typography>
            </Grid>
            <Button color="secondary" variant="contained">
              Contact Us
            </Button>
          </Stack>
        </Grid>
      </ContactUs>
      <Section4 />

      <Footer />
    </Grid>
  );
};

export default HomePage;
