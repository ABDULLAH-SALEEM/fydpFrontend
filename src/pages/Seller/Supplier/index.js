import { Container, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { storeData } from 'src/helper/storageHelper';
import SupplierDetails from './Components/supplierDetails';
import { useSupplier } from 'src/hooks/useSupplier';
import SupplierListTable from './Components/SupplierList';
import { useProduct } from 'src/hooks/useProducts';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState();
  const [supplier, setSupplier] = useState();
  const [open, setOpen] = useState(false);
  const { getSuppliers, getSingleSupplier } = useSupplier();
  const { getUserProducts } = useProduct();

  const handleClose = () => {
    setOpen(false);
  };

  const getAllSuppliers = async () => {
    try {
      const resp = await getSuppliers();
      if (resp) {
        setSuppliers(resp.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSingleSupplierData = async (id) => {
    try {
      const resp = await getSingleSupplier(id);
      if (resp) {
        const productsData = await getUserProducts(id);
        setSupplier({ ...resp.data, products: productsData.data });
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
        <title> Suppliers </title>
      </Helmet>
      <Container>
        <Typography variant="h4" gutterBottom>
          Avalaible suppliers
        </Typography>
      </Container>
      {suppliers?.length >= 0 && <SupplierListTable data={suppliers} onViewButtonClicked={onViewButtonClicked} />}

      {supplier && <SupplierDetails handleClose={handleClose} open={open} data={supplier} />}
    </div>
  );
};

export default SupplierList;
