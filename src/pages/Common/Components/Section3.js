import { Grid, Stack, Typography, Card, Avatar, CardContent } from '@mui/material'

export default function Section3() {
  return (
    <Grid
      container
      sx={{
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: 20
      }}
    >
      <Grid>
        <Typography color={'primary'} variant='h3' sx={{ marginBottom: 5, textAlign: 'center' }}>
          Some Facts and Figures
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus vitae turpis sit amet pulvinar.
        </Typography>
        <Stack
          sx={{ marginTop: 20, marginBottom: 20 }}
          alignItems='center'
          flexWrap='wrap'
          justifyContent='center'
          direction='row'
          spacing={40}
        >
          <Grid>
            <Typography color={'primary'} variant='h2'>
              50
            </Typography>
            <Typography sx={{ textAlign: 'center' }}>Countries</Typography>
          </Grid>
          <Grid>
            <Typography color={'primary'} variant='h2'>
              600
            </Typography>
            <Typography sx={{ textAlign: 'center' }}>Clients</Typography>
          </Grid>
          <Grid>
            <Typography color={'primary'} variant='h2'>
              100+
            </Typography>
            <Typography sx={{ textAlign: 'center' }}>Products</Typography>
          </Grid>
        </Stack>
      </Grid>

      <Grid>
        <Typography color={'primary'} variant='h3' sx={{ marginBottom: 5, textAlign: 'center' }}>
          Testimonials
        </Typography>
        <Typography sx={{ textAlign: 'center' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus vitae turpis sit amet pulvinar.
        </Typography>
        <Stack
          sx={{ marginTop: 20, marginBottom: 20 }}
          alignItems='center'
          flexWrap='wrap'
          justifyContent='center'
          direction='row'
          spacing={10}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography variant='body2' color='text.secondary' sx={{ marginBottom: 5 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus vitae turpis sit amet pulvinar. Sed
                vitae urna ultrices, malesuada est sed, posuere orci. Mauris nec diam mauris. Vestibulum molestie nulla
                et urna iaculis, eget dignissim ante sodales. Ut lobortis, leo varius ultricies feugiat, libero sem
                auctor leo, at maximus.
              </Typography>
              <Stack direction='row' spacing={2} alignItems='center'>
                <Grid>
                  <Avatar />
                </Grid>
                <Grid>
                  <Typography variant='h6'>Lorem ipsum</Typography>
                  <Typography>Lorem ipsum dolor sit amet,</Typography>
                </Grid>
              </Stack>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography variant='body2' color='text.secondary' sx={{ marginBottom: 5 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus vitae turpis sit amet pulvinar. Sed
                vitae urna ultrices, malesuada est sed, posuere orci. Mauris nec diam mauris. Vestibulum molestie nulla
                et urna iaculis, eget dignissim ante sodales. Ut lobortis, leo varius ultricies feugiat, libero sem
                auctor leo, at maximus.
              </Typography>
              <Stack direction='row' spacing={2} alignItems='center'>
                <Grid>
                  <Avatar />
                </Grid>
                <Grid>
                  <Typography variant='h6'>Lorem ipsum</Typography>
                  <Typography>Lorem ipsum dolor sit amet,</Typography>
                </Grid>
              </Stack>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography variant='body2' color='text.secondary' sx={{ marginBottom: 5 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus vitae turpis sit amet pulvinar. Sed
                vitae urna ultrices, malesuada est sed, posuere orci. Mauris nec diam mauris. Vestibulum molestie nulla
                et urna iaculis, eget dignissim ante sodales. Ut lobortis, leo varius ultricies feugiat, libero sem
                auctor leo, at maximus.
              </Typography>
              <Stack direction='row' spacing={2} alignItems='center'>
                <Grid>
                  <Avatar />
                </Grid>
                <Grid>
                  <Typography variant='h6'>Lorem ipsum</Typography>
                  <Typography>Lorem ipsum dolor sit amet,</Typography>
                </Grid>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  )
}
