import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography } from '@mui/material';
import { AppCurrentVisits, AppWidgetSummary, AppConversionRates } from '../../../sections/@dashboard/app';
import { useAuth } from 'src/hooks/useAuth';
import { useTheme } from '@mui/material/styles';
import { useDashboard } from 'src/hooks/useDashboard';

const SellerDashboard = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const [sellerDashboard, setSellerDashboard] = useState();

  const { getSellerDashboardData } = useDashboard();

  const onSellerDashboardData = async () => {
    try {
      const resp = await getSellerDashboardData();
      if (resp) {
        console.log(resp.data);
        setSellerDashboard(resp.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    onSellerDashboardData();
  }, []);
  return (
    <>
      <Helmet>
        <title> Dashboard | Agrochain </title>
      </Helmet>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back {user?.email}
        </Typography>
        <Typography variant='h5' color={"primary"} mb={2}>Ratings</Typography>
        <Grid container spacing={3}>
         

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="5 star" total={sellerDashboard?.ratings.fiveStarCount} icon={'bx:happy'} showIcon />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="4 star" total={sellerDashboard?.ratings.fourStarCount} color="info" icon={'cil:happy'} showIcon />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="3 star" total={sellerDashboard?.ratings.threeStarCount} color="warning" icon={'mdi:face-sad-outline'} showIcon />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="2 star"
              total={sellerDashboard?.ratings.twoStarCount}
              color="error"
              icon={'icon-park-twotone:worried-face'}
              showIcon
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            {sellerDashboard?.orderDetails && (
              <AppConversionRates
                title="Orders stats"
                subheader="Based on order status"
                chartData={sellerDashboard.orderDetails?.map((item) => {
                  return { label: item._id, value: item.count };
                })}
              />
            )}
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            {sellerDashboard && (
              <AppCurrentVisits
                title="Total Inquiries"
                subheader={sellerDashboard.inquiryDetails[0]?.totalInquiries}
                chartData={[
                  { label: 'Answered', value: sellerDashboard.inquiryDetails[0]?.answeredInquiries },
                  { label: 'Unanswered', value: sellerDashboard.inquiryDetails[0]?.unansweredInquiries },
                ]}
                chartColors={[theme.palette.primary.main, theme.palette.error.main]}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SellerDashboard;
