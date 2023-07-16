import { Container, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAssignment } from 'src/hooks/useAssignment';
import AssignmentList from './Components/AssignmentList';
import { useQuotation } from 'src/hooks/useQuotation';
import AssignmentDetails from './Components/AssignmentDetails';

const SupplierAssignments = () => {
  const [assignments, setAssignments] = useState();
  const [assignment, setAssignment] = useState();
  const [open, setOpen] = useState(false);
  const { getAssignments, getSingleAssignment } = useAssignment();
  const { getSingleQuotation } = useQuotation();

  const handleClose = () => {
    setOpen(false);
  };

  const getAllAssignments = async () => {
    try {
      const resp = await getAssignments();
      if (resp) {
        setAssignments(resp.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSingleAssignmentData = async (id) => {
    try {
      const resp = await getSingleAssignment(id);
      if (resp) {
        const product = await getSingleQuotation(resp.data.orderId.quotationId);
        setAssignment({ ...resp.data, product: product.data.product, quantity: product.data.quantity });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllAssignments();
  }, []);

  const onViewButtonClicked = (id) => {
    setOpen(true);
    getSingleAssignmentData(id);
  };

  return (
    <div>
      <Helmet>
        <title> Assignments </title>
      </Helmet>
      <Container>
        <Typography variant="h4" gutterBottom>
          My assignments
        </Typography>
      </Container>
      {assignments?.length >= 0 && <AssignmentList data={assignments} onViewButtonClicked={onViewButtonClicked} />}

      {assignment && <AssignmentDetails handleClose={handleClose} open={open} data={assignment} />}
    </div>
  );
};

export default SupplierAssignments;
