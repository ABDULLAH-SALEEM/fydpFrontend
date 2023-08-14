import React, { useEffect, useState } from 'react';
import { Typography, Grid, Stack, Modal, Box, Avatar, CircularProgress } from '@mui/material';
import { getRoleIcon } from 'src/helper/common';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
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
  const [sortedArray, setSortedArray] = useState();
  const sortArray = () => {
    data.forEach((item) => {
      item.parsedDate = new Date(item.timeStamp);
    });

    data.sort((a, b) => a.parsedDate - b.parsedDate);
    setSortedArray([...data]);
  };

  const options = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };

  useEffect(() => {
    sortArray();
  }, [data]);
  return (
    <Modal open={open} onClose={handleChange}>
      <Box sx={style}>
        {loading && <CircularProgress />}
        {sortedArray?.map(({ name, role, email, timeStamp }, key) => {
          let dateObject;
          if (timeStamp) {
            dateObject = new Date(timeStamp);
          }

          return (
            <Stack
              justifyContent={'center'}
              direction={'row'}
              flexWrap={'wrap'}
              alignItems={'center'}
              flexDirection={'column'}
              mb={2}
            >
              <Avatar sx={{ width: 34, height: 34, backgroundColor: '#466625' }}>{getRoleIcon(role)}</Avatar>
              <Typography variant="caption">{role}</Typography>
              <Typography variant="body">{name}</Typography>
              <Typography variant="body">{email}</Typography>
              <Typography variant="body">{new Intl.DateTimeFormat('en-GB', options).format(dateObject)}</Typography>
              {key !== sortedArray.length - 1 && <ArrowDownwardIcon />}
            </Stack>
          );
        })}
      </Box>
    </Modal>
  );
};

export default OrderHistoryModal;
