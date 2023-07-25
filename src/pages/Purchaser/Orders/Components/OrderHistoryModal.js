import React from 'react';
import { Typography, Grid, Stack, Modal, Box, Avatar, CircularProgress } from '@mui/material';
import { getRoleIcon } from 'src/helper/common';
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
const OrderHistoryModal = ({ open, handleChange, data, loading }) => {
  return (
    <Modal open={open} onClose={handleChange}>
      <Box sx={style}>
        {loading && <CircularProgress />}
        {data.map(({ name, role, email, timeStamp }) => {
          return (
            <Stack justifyContent={'center'} alignItems={'center'} flexDirection={'column'} mb={2}>
              <Avatar sx={{ width: 34, height: 34, backgroundColor: '#466625' }}>{getRoleIcon(role)}</Avatar>

              <Typography variant="caption">{role}</Typography>
              <Typography variant="body">{name}</Typography>
              <Typography variant="body">{email}</Typography>
              <Typography variant="body">{timeStamp}</Typography>
            </Stack>
          );
        })}
      </Box>
    </Modal>
  );
};

export default OrderHistoryModal;
