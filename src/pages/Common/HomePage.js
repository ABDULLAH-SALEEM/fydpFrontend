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
            "A Blockchain Revolutionized Integrated Supply Chain Model."
          </Typography>
        </Grid>
        <Stack alignItems="center" flexWrap="wrap" justifyContent="center" direction="row" spacing={7}>
          <Button variant="contained" sx={{ height: 50 }}>
            Get started
          </Button>
          <Button variant="outlined" sx={{ height: 50 }}>
            Learn more
          </Button>
        </Stack>
      </HeroBanner>

      <Grid sx={{ marginTop: -15 }}>
        <Stack alignItems="center" flexWrap="wrap" justifyContent="center" direction="row" spacing={7}>
          <FeaturesCard
            heading="Rating mechanism"
            description="AgroChain's comprehensive review system empowers purchasers to share their experiences by giving ratings to different sellers . This mechanism fosters accountability, encourages best practices, and helps participants make informed decisions."
          />
          <FeaturesCard
            heading="Order tracking"
            description="Stay informed with real-time insights into the journey of your agricultural products. AgroChain empowers participants to monitor every step of the supply chain, from sourcing to delivery, ensuring transparency and accountability at all stages."
          />
          <FeaturesCard heading="Traceability" description="With a supply chain DAPP, the entire supply chain can be represented as a blockchain network, where participants can access and add data to the shared ledger in real-time." />
        </Stack>
      </Grid>

      <Stack
        sx={{ marginTop: 20, marginBottom: 20 }}
        alignItems="center"
        flexWrap="wrap"
        justifyContent="center"
        direction="row"
        spacing={20}
      >
        <Grid sx={{ width: '25%' }}>
          <Typography sx={{ marginBottom: 3 }}>Digitization</Typography>
          <Typography sx={{ marginBottom: 3 }} variant="h3">
            Digitize of agricultural process
          </Typography>
          <Typography sx={{ marginBottom: 3 }}>
            Digitize the manual agricultural and food supply chain onto a completely automated model by providing a web
            portal for the purchasers and sellers to engage with each other in a secure manner with separate views for
            both parties.
          </Typography>
          <Button variant="contained">Learn more</Button>
        </Grid>
        <Grid sx={{ width: '35%' }}>
          <img width={'100%'} src="/assets/images/digitization.jpeg" />
        </Grid>
      </Stack>

      <Stack
        sx={{ marginTop: 20, marginBottom: 20 }}
        alignItems="center"
        flexWrap="wrap"
        justifyContent="center"
        direction="row"
        spacing={20}
      >
        <Grid sx={{ width: '35%' }}>
          <img width={'100%'} src="/assets/images/tamperproof.jpeg" />
        </Grid>
        <Grid sx={{ width: '25%' }}>
          <Typography sx={{ marginBottom: 3 }}>Tamper Proof</Typography>
          <Typography sx={{ marginBottom: 3 }} variant="h3">
            integrity of the whole export
          </Typography>
          <Typography sx={{ marginBottom: 3 }}>
            Ensure the integrity of the whole export procedure by making sure that no data is tampered in between the
            whole procedure by implementing Blockchain technology.
          </Typography>
          <Button variant="contained">Learn more</Button>
        </Grid>
      </Stack>

      <Stack
        sx={{ marginTop: 20, marginBottom: 20 }}
        alignItems="center"
        flexWrap="wrap"
        justifyContent="center"
        direction="row"
        spacing={20}
      >
        <Grid sx={{ width: '25%' }}>
          <Typography sx={{ marginBottom: 3 }}>End-to-End User Trust</Typography>
          <Typography sx={{ marginBottom: 3 }} variant="h3">
            Remove the intermediaries
          </Typography>
          <Typography sx={{ marginBottom: 3 }}>
            Provide disintermediation to remove the intermediaries in the whole process to reduce transaction costs and
            secure transactions. End-to-end user visibility with the help of Blockchain technology.
          </Typography>
          <Button variant="contained">Learn more</Button>
        </Grid>
        <Grid sx={{ width: '35%' }}>
          <img width={'100%'} src="/assets/images/integrity.jpeg" />
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
              <Typography variant="h4" color="white">
                Have questions or want to know more about AgroChain? We're here to help. Feel free to reach out to us
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
