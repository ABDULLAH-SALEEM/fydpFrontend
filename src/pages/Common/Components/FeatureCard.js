import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import GavelIcon from '@mui/icons-material/Gavel'

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  marginBottom: '20px'
}))

export default function FeaturesCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <StyledGrid>
          <GavelIcon style={{color:"white"}}  />
        </StyledGrid>
        <Typography gutterBottom variant='h5' component='div'>
          Neque porro
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus vitae turpis sit amet pulvinar. Sed vitae
          urna ultrices, malesuada est sed, posuere orci. Mauris nec diam mauris. Vestibulum molestie nulla et urna
          iaculis, eget dignissim ante sodales. Ut lobortis, leo varius ultricies feugiat, libero sem auctor leo, at
          maximus.
        </Typography>
      </CardContent>
    </Card>
  )
}

