import { Container, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDistributer } from 'src/hooks/useDistributer';
import DistributerListTable from './Components/DistributerList';
import DistributerDetails from './Components/distributerDetails';

const DistributerList = () => {
  const [distributers, setDistributers] = useState();
  const [distributer, setDistributer] = useState();
  const [open, setOpen] = useState(false);
  const { getDistributers, getSingleDistributer } = useDistributer();

  const handleClose = () => {
    setOpen(false);
  };

  const getAllSuppliers = async () => {
    try {
      const resp = await getDistributers();
      if (resp) {
        setDistributers(resp.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSingleSupplierData = async (id) => {
    try {
      const resp = await getSingleDistributer(id);
      if (resp) {
        setDistributer({ ...resp.data });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllSuppliers();
  }, []);

  const onViewButtonClicked = (id) => {
    setOpen(true);
    getSingleSupplierData(id);
  };

  return (
    <div>
      <Helmet>
        <title> Distributers </title>
      </Helmet>
      <Container>
        <Typography variant="h4" gutterBottom>
          Avalaible distributers
        </Typography>
      </Container>
      {distributers?.length >= 0 && (
        <DistributerListTable data={distributers} onViewButtonClicked={onViewButtonClicked} />
      )}

      {distributer && <DistributerDetails handleClose={handleClose} open={open} data={distributer} />}
    </div>
  );
};

export default DistributerList;
