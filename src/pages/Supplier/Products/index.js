import { Button, Container, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useProduct } from 'src/hooks/useProducts';
import ProductList from './Components/ProductLists';
import AddProductsForm from './Components/AddProductsForm';

const SupplierProducts = () => {
  const [products, setProducts] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getProducts, createProduct } = useProduct();

  const handleChange = () => {
    setOpen(!open);
  };

  const getAllProducts = async () => {
    try {
      const resp = await getProducts();
      if (resp) {
        setProducts(resp.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createNewProduct = async (body) => {
    if (loading) return;
    setLoading(true);
    try {
      const resp = await createProduct(body);
      if (resp) {
        getAllProducts();
        setLoading(false);
        handleChange();
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div>
      <Helmet>
        <title> Products </title>
      </Helmet>
      <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          My Products
        </Typography>
        <Button variant="contained" onClick={()=>setOpen(true)}>Add product</Button>
      </Container>
      {products?.length >= 0 && <ProductList data={products} />}
      <AddProductsForm onSubmit={createNewProduct} open={open} handleChange={handleChange} loading={loading} />
    </div>
  );
};

export default SupplierProducts;
