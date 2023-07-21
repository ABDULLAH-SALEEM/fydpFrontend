import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography } from '@mui/material';
import { AppCurrentVisits, AppWidgetSummary, AppConversionRates } from '../../../sections/@dashboard/app';
import { useAuth } from 'src/hooks/useAuth';
import { useTheme } from '@mui/material/styles';

const DistributerDashboard = () => {
  const { user } = useAuth();
  const theme = useTheme();
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
            <AppWidgetSummary title="Total Shipments" total={'5'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="In transit" total={'4'} color="info" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Shipped" total={'3'} color="warning" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Missed" total={'2'} color="error" />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Orders stats"
            subheader="Based on order status"
            // chartData={dashboardData.top10ConsumersInTimeFrame.map((item) => {
            //   return { label: item.firstname + ' ' + item.lastname, value: item.burnTokens };
            // })}
          />
       
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
       
          <AppCurrentVisits
            title="Inquiries stats"
            // subheader={dashboardData.userDetails[0]?.totalUsers}
            // chartData={[
            //   { label: 'Answered', value: dashboardData.userDetails[0]?.activeUsers },
            //   { label: 'unanswered', value: dashboardData.userDetails[0]?.nonActiveUsers },
            // ]}
            chartColors={[theme.palette.primary.main, theme.palette.error.main]}
          />
        
      </Grid> */}

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

export default DistributerDashboard;
