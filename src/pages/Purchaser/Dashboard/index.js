import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography } from '@mui/material';
import { AppCurrentVisits, AppWidgetSummary, AppConversionRates } from '../../../sections/@dashboard/app';
import { useAuth } from 'src/hooks/useAuth';
import { useTheme } from '@mui/material/styles';
import { useDashboard } from 'src/hooks/useDashboard';

const PurchaserDashboard = () => {
  const { user } = useAuth();
  const theme = useTheme();

  const [purchaserDashboard, setPurchaserDashboard] = useState();

  const { getPurchaserDashboardData } = useDashboard();

  const onPurchaserDashboardData = async () => {
    try {
      const resp = await getPurchaserDashboardData();
      if (resp) {
        console.log(resp.data);
        setPurchaserDashboard(resp.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    onPurchaserDashboardData();
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

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total sellers" total={purchaserDashboard?.totalSellers.toString()} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total inquiries" total={purchaserDashboard?.totalInquiries.toString()} color="info" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total quotations" total={purchaserDashboard?.totalQuotation.toString()} color="warning" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total orders" total={purchaserDashboard?.totalOrders.toString()} color="error" />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            {purchaserDashboard?.orderDetails && (
              <AppConversionRates
                title="Orders stats"
                subheader="Based on order status"
                chartData={purchaserDashboard.orderDetails?.map((item) => {
                  return { label: item._id, value: item.count };
                })}
              />
            )}
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            {purchaserDashboard && (
              <AppCurrentVisits
                title="Total Inquiries"
                subheader={purchaserDashboard.inquiryDetails[0]?.totalInquiries}
                chartData={[
                  { label: 'Answered', value: purchaserDashboard.inquiryDetails[0]?.answeredInquiries },
                  { label: 'Unanswered', value: purchaserDashboard.inquiryDetails[0]?.unansweredInquiries },
                ]}
                chartColors={[theme.palette.primary.main, theme.palette.error.main]}
              />
            )}
          </Grid>

          {/* <Grid item xs={12} md={12} lg={12}>
            <AppConversionRates
              title="Avalaible sellers"
              subheader="Based on seller's ratings"
              chartData={dashboardData.usersBasedOnSubscription.map((item) => {
                return {
                  label: item._id.planName
                    ? item._id.planName + ' ' + (item._id.planType == 'monthly' ? 'M' : 'Y')
                    : 'NOT SUBSCRIBED',
                  value: item.count,
                };

                // return {label:item._id.planName + " " + item._id.planType,value:item.count}
              })}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
};

export default PurchaserDashboard;
