import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  DialogTitle,
} from '@mui/material';
import { axiosApi } from 'src/service/apiEnviornment';
import Button from '@mui/material/Button';
import PencilIcon from "../assets/edit.png"
import DeleteIcon from "../assets/trash.png"

import moment from "moment"
// components

import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead } from '../sections/@dashboard/user';
// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'tokens', label: 'Tokens', alignRight: false },
  { id: 'packageExpireOn', label: 'Expired On', alignRight: false },

  { id: 'action', label: 'Action', alignRight: false },



];

// ----------------------------------------------------------------------




export default function UserPage() {
  const [search,setSearch]=useState("")
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([])
  const [loader, setLoader] = useState(false);
  const [edit, setEdit] = useState(false)
  const [tokens, setTokens] = useState(0)
  const [isDisabeld, setIsDisabeld] = useState(false)
  const [deleteModal,setDeleteModal]=useState(false)
  const handleCloseDelete = () => {
   setDeleteModal(false)
  };

  const handleChangePage = (event, newPage) => {

    setPage(newPage);
  };
  const handleClose = () => {
    setEdit(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const getData = async () => {
    setLoader(true)
    await axiosApi("GET", `/auth/get-all-users`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoader(false)

  };
  useEffect(() => {
    getData()
  }, [])
  const submit = async (action) => {
    setIsDisabeld(true)
    await axiosApi("PUT", `/auth/update-tokens/${edit._id}`, {
      tokens,
      action
    })
      .then((res) => {
        getData()

      })
      .catch((err) => {
        console.log(err);
      });
    handleClose()
    setTokens(0)
    setIsDisabeld(false)
  }
  const del = async () => {
    await axiosApi("DELETE", `/auth/delete-user-by-id/${deleteModal}`)
        .then((res) => {
            getData()
            handleCloseDelete()
        })
        .catch((err) => {
            console.log(err);
        });
}
  return (
    <>
      <Helmet>
        <title> Users  </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
          <div>
            <TextField placeholder='Search' value={search} onChange={(e)=>{setSearch(e.target.value)}}></TextField>
          </div>

        </Stack>
        {loader ? <div style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress />
        </div>
          :
          <Card>

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    headLabel={TABLE_HEAD}
                    rowCount={data.length}
                  />

                  <TableBody>
                    {data.filter((val)=>{if(search==""){return(val)}
                    else if(val.email.toLowerCase().includes(search.toLowerCase())){return (val)}})
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                      const { email, tokens, packageExpireOn } = row;
                      return (
                        <TableRow key={index}  >
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{tokens}</TableCell>
                          <TableCell align="left">{packageExpireOn ? moment(packageExpireOn).format('LL') : "Not Subscribed"}</TableCell>
                          <TableCell style={{ display: "flex" }} align="center">
                            <img style={{ cursor: "pointer", marginLeft: "15px" }} src={PencilIcon} onClick={() => { setEdit(row) }}></img>
                            <img style={{ cursor: "pointer", marginLeft: "15px" }} src={DeleteIcon} onClick={() => { setDeleteModal(row._id) }}></img>

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
        }
        <Dialog
          open={edit}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Update Tokens"}
          </DialogTitle>
          <DialogContent style={{ minWidth: "600px" }}>
            <div>
              Tokens
              <TextField type='number' onChange={(e) => setTokens(e.target.value)} value={tokens} style={{ width: "100%" }}></TextField>
            </div>


          </DialogContent>
          <DialogActions>
            <Button disabled={isDisabeld} onClick={() => submit("add")}>Add</Button>

            <Button disabled={isDisabeld} onClick={() => submit("sub")}>Sub</Button>
          </DialogActions>
        </Dialog>
        <Dialog
        open={deleteModal}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete"}
        </DialogTitle>
        <DialogContent style={{ minWidth: "600px" }}>
         Are you sure you want to delete?


        </DialogContent>
        <DialogActions>
          <Button onClick={() => { del() }}>Yes</Button>
                    <Button onClick={() => { handleCloseDelete() }}>No</Button>

        </DialogActions>
      </Dialog>
      </Container>

    </>
  );
}
