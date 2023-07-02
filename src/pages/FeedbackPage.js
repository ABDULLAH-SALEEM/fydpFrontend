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
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress
} from '@mui/material';
import { axiosApi } from 'src/service/apiEnviornment';
import Button from '@mui/material/Button';
import EyeIcon from "../assets/eye.png"
import DeleteIcon from "../assets/trash.png"
import "./feedback.css"

// components

import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead } from '../sections/@dashboard/user';
// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'issue', label: 'Issue', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'details', label: 'Details', alignCenter: true },


];

// ----------------------------------------------------------------------




export default function FeedbackPage() {
  const [search, setSearch] = useState("")

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([])
  const [edit, setEdit] = useState()
  const [reply, setReply] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loader, setLoader] = useState(false);
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
  const handleClose2 = () => {
    setReply(false);
  };
  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const getData = async () => {
    setLoader(true)
    await axiosApi("GET", `/feedback/get-all-feedback`)
      .then((res) => {
        console.log(res);
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
  const sendReply = async () => {
    reply.feedback = feedback
    await axiosApi("POST", `/feedback/send-feedback`, reply)
      .then((res) => {
        setReply(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const del = async () => {
    await axiosApi("DELETE", `/feedback/delete-feedback-by-id/${deleteModal}`)
      .then((res) => {
        getData()
        handleCloseDelete()
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const updateStatus = async (id, body) => {
    await axiosApi("PUT", `/feedback/update-feedback-by-id/${id}`, body)
      .then((res) => {
        getData()
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Helmet>
        <title> Feedback  </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Feedback
          </Typography>
          <div>
            <TextField placeholder='Search' value={search} onChange={(e) => { setSearch(e.target.value) }}></TextField>
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
                    {data.filter((val) => {
                      if (search == "") { return (val) }
                      else if (val.email.toLowerCase().includes(search.toLowerCase())) { return (val) }
                    })
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                        const { name, email, issue, status, _id } = row;

                        return (
                          <TableRow key={index}  >
                            <TableCell align="left">{name}</TableCell>
                            <TableCell align="left">{email}</TableCell>
                            <TableCell align="left">{issue}</TableCell>
                            <TableCell align="left">
                              <div onClick={() => {

                                if (status == true) {
                                  updateStatus(row._id,{status:false});

                                }
                                else {
                                  updateStatus(row._id,{status:true})
                                }
                              }
                              }

                                className={(status == true) ? "recievable-status-paid" : "recievable-status-unpaid"}>

                                <div className={(status == true) ? "paid-paid" : "paid-unpaid"}>
                                  <p>RES</p>
                                </div>
                                <div className={(status == true) ? "unpaid-paid" : "unpaid-unpaid"}>
                                  <p>NOT RES</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell style={{ display: "flex" }} align="center">
                              <img style={{ cursor: "pointer", marginLeft: "15px" }} src={EyeIcon} onClick={() => { setEdit(row) }}></img>
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
      </Container>
      <Dialog
        open={edit}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Feedback Details"}
        </DialogTitle>
        <DialogContent style={{ minWidth: "600px" }}>
          <div>
            <h4>Name</h4>
            <p>{edit?.name}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{edit?.email}</p>
          </div>
          <div>
            <h4>Issue</h4>
            <p>{edit?.issue}</p>
          </div>
          <div>
            <h4>Description</h4>
            <p>{edit?.description}</p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setReply(edit); handleClose() }}>Reply</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={reply}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Reply"}
        </DialogTitle>
        <DialogContent style={{ minWidth: "600px" }}>
          <div>
            To : {reply?.email}
            <TextField onChange={(e) => setFeedback(e.target.value)} value={feedback} multiline={true} rows={6} style={{ width: "100%" }}></TextField>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => sendReply()}>Send</Button>

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
    </>
  );
}
