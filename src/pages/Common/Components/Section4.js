import { Grid, Typography, FormControl, TextField, Button, InputLabel } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import FormHelperText from '@mui/material/FormHelperText'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

let defaultValues = {
  name: '',
  email: '',
  message: ''
}
export default function Section4() {
  const schema = yup.object().shape({
    name: yup.string().required('Name is a required field'),
    message: yup.string().required('Message is a required field'),
    email: yup.string().email('Invalid email').required('Email is a required field')
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const onSubmit = data => {
    console.log(data)
  }

  return (
    <Grid
      container
      sx={{
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: 20,
        paddingBottom: 20
      }}
    >
      <Grid>
        <Typography color={'primary'} variant='h3' sx={{ marginBottom: 5, textAlign: 'center' }}>
          Or Drop us a Query!
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus vitae turpis sit amet pulvinar.
        </Typography>
      </Grid>
      <Grid sx={{ marginTop: 10 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <InputLabel>Name*</InputLabel>
              <FormControl fullWidth>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField value={value} onChange={onChange} error={Boolean(errors.name)} />
                  )}
                />
                {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel>Email*</InputLabel>
              <FormControl fullWidth>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      placeholder={'example@gmail.com'}
                    />
                  )}
                />
                {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Message*</InputLabel>
              <FormControl fullWidth>
                <Controller
                  name='message'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.message)}
                      multiline
                      minRows={5}
                    />
                  )}
                />
                {errors.message && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.message.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained'>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}
