import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import { Typography, Radio, RadioGroup, FormControl, FormControlLabel, Modal, Box, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  maxHeight: '85%',
  overflow: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const defaultValues = {
  question1: '',
  question2: '',
  question3: '',
  question4: '',
  question5: '',
};

export default function RatingQuestionary({ open, handleRatingModal, onSubmit }) {
  const schema = yup.object().shape({
    question1: yup.number('This field is required').required('This field is required'),
    question2: yup.number('This field is required').required('This field is required'),
    question3: yup.number('This field is required').required('This field is required'),
    question4: yup.number('This field is required').required('This field is required'),
    question5: yup.number('This field is required').required('This field is required'),
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  return (
    <Modal open={open} onClose={handleRatingModal}>
      
      <Box sx={style}>
      <Typography color={'primary'} textAlign="center" mb={2}>
        Please provide an honest review before accepting an order.
      </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Typography fontWeight={600} color="primary">
              a) Quality:
            </Typography>
            <Typography>How would you rate the overall quality of the agricultural goods you received?</Typography>
            <Controller
              name="question1"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup name="question1" {...field} row>
                  <FormControlLabel value={1} control={<Radio />} label="Awful" />
                  <FormControlLabel value={2} control={<Radio />} label="Poor" />
                  <FormControlLabel value={3} control={<Radio />} label="Average" />
                  <FormControlLabel value={4} control={<Radio />} label="Good" />
                  <FormControlLabel value={5} control={<Radio />} label="Excellent" />
                </RadioGroup>
              )}
            />
            {errors.question1 && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.question1.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Typography fontWeight={600} color="primary">
              b) Customer Support:
            </Typography>
            <Typography>Rate the level of customer support provided.</Typography>
            <Controller
              name="question2"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup name="question2" {...field} row>
                  <FormControlLabel value={1} control={<Radio />} label="Awful" />
                  <FormControlLabel value={2} control={<Radio />} label="Poor" />
                  <FormControlLabel value={3} control={<Radio />} label="Average" />
                  <FormControlLabel value={4} control={<Radio />} label="Good" />
                  <FormControlLabel value={5} control={<Radio />} label="Excellent" />
                </RadioGroup>
              )}
            />
            {errors.question2 && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.question2.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Typography fontWeight={600} color="primary">
              c) Timeliness:
            </Typography>
            <Typography>
              How well did the seller meet the delivery or pickup timeline for your agricultural goods?
            </Typography>
            <Controller
              name="question3"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup name="question3" {...field} row>
                  <FormControlLabel value={1} control={<Radio />} label="Awful" />
                  <FormControlLabel value={2} control={<Radio />} label="Poor" />
                  <FormControlLabel value={3} control={<Radio />} label="Average" />
                  <FormControlLabel value={4} control={<Radio />} label="Good" />
                  <FormControlLabel value={5} control={<Radio />} label="Excellent" />
                </RadioGroup>
              )}
            />
            {errors.question3 && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.question3.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Typography fontWeight={600} color="primary">
              d) Accuracy:
            </Typography>
            <Typography>
              How accurately did the received goods match the description provided by the seller?{' '}
            </Typography>
            <Controller
              name="question4"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup name="question4" {...field} row>
                  <FormControlLabel value={1} control={<Radio />} label="Awful" />
                  <FormControlLabel value={2} control={<Radio />} label="Poor" />
                  <FormControlLabel value={3} control={<Radio />} label="Average" />
                  <FormControlLabel value={4} control={<Radio />} label="Good" />
                  <FormControlLabel value={5} control={<Radio />} label="Excellent" />
                </RadioGroup>
              )}
            />
            {errors.question4 && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.question4.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Typography fontWeight={600} color="primary">
              e) Overall Experience:
            </Typography>
            <Typography>
              Considering all aspects of your interaction, how satisfied are you with the overall experience of
              purchasing agricultural goods from this seller?
            </Typography>
            <Controller
              name="question5"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup name="question5" {...field} row>
                  <FormControlLabel value={1} control={<Radio />} label="Awful" />
                  <FormControlLabel value={2} control={<Radio />} label="Poor" />
                  <FormControlLabel value={3} control={<Radio />} label="Average" />
                  <FormControlLabel value={4} control={<Radio />} label="Good" />
                  <FormControlLabel value={5} control={<Radio />} label="Excellent" />
                </RadioGroup>
              )}
            />
            {errors.question5 && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.question5.message}</FormHelperText>
            )}
          </FormControl>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
