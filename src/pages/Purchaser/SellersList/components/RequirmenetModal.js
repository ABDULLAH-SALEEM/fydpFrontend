import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import BuyRequirementsForm from '../../Inquiry/Components/InquiryForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  maxHeight:'85%',
  overflow:'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function RequirenmentModal({ open, handleChange }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleChange}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" mb={2} variant="h6" component="h2">
            Please specify your requiremnet in details
          </Typography>
          <BuyRequirementsForm />
        </Box>
      </Modal>
    </div>
  );
}
