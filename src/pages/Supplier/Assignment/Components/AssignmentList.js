import React, { useState } from 'react';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  IconButton,
  Card,
  Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { UserListHead } from 'src/sections/@dashboard/user';

const AssignmentList = ({ data, onViewButtonClicked }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const TABLE_HEAD = [
    { id: 'id', label: 'Assignment id', alignRight: false },
    { id: 'assignedBy', label: 'Assigned By', alignRight: false },
    { id: 'deadline', label: 'Assignment Deadline', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'action', label: 'Action', alignRight: false },
  ];
  //   const data = [
  //     {
  //       name: 'Abdullah',
  //       email: 'email',
  //       product: 'product',
  //       product: 'product',
  //       quantity: 'quantity',
  //       status: 'status',
  //     },
  //   ];
  return (
    <Card>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead headLabel={TABLE_HEAD} rowCount={data?.length} />
            {data?.length <= 0 && (
              <Typography textAlign={'center'} p={1}>
                No data to show
              </Typography>
            )}
            <TableBody>
              {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, index) => {
                const { deadline,assignedBy, orderId, _id } = row;
                return (
                  <TableRow key={index}>
                    <TableCell align="left">{_id}</TableCell>
                    <TableCell align="left">{assignedBy.email}</TableCell>
                    <TableCell align="left">{deadline}</TableCell>
                    <TableCell align="left">{orderId.status}</TableCell>
                    <TableCell style={{ display: 'flex' }} align="center">
                      <IconButton onClick={() => onViewButtonClicked(_id)}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

export default AssignmentList;
