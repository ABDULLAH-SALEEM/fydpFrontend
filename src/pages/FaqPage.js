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

import parse from 'html-react-parser';

import ReactQuill from 'react-quill';
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';



import { axiosApi } from 'src/service/apiEnviornment';
import Button from '@mui/material/Button';
import EyeIcon from "../assets/eye.png"
import DeleteIcon from "../assets/trash.png"

import Iconify from 'src/components/iconify/Iconify';
// components

import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead } from '../sections/@dashboard/user';
// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'priority', label: 'Priority', alignRight: false },
  { id: 'englishQuestion', label: 'English Question', alignRight: false },
  { id: 'actions', label: 'Actions', alignRight: false },



];

// ----------------------------------------------------------------------


const excludeModules = ['video', 'image'];

const excludeFormats = ['video', 'image'];

export default function FaqPage() {

  const Font = Quill.import("formats/font");
  Font.whitelist = ["Arial", "times", 'Calibiri', 'serif', 'monospace', 'san', 'Calligraffitti'];
  Quill.register(Font, true);

  const [info, setinfo] = useState({
    id: "",
    en_que: '',
    en_ans: '',
    fr_que: '',
    fr_ans: '',
    priority: 0,

  })
  const [deleteModal,setDeleteModal]=useState(false)
  const handleCloseDelete = () => {
   setDeleteModal(false)
  };

 
  const modules = {
    toolbar: {
      container: [
        [{ header: '1' }, { header: '2' }],
        [{ font: ['Arial', 'times', 'Calibiri', 'serif', 'monospace', 'san', 'Calligraffitti'] }],
        [{ size: [] }],
        [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'code', 'formula'],
        ['clean']
      ],
      handlers: {}
    },
    ...Object.fromEntries(excludeModules.map((module) => [module, false]))
  };
  Font.whitelist = ['mirza', 'roboto'];
  Quill.register(Font, true);
  
  
  var quill = new Quill('#editor-container', {
    modules: {
      toolbar: '#toolbar-container'
    },
    theme: 'snow'
  });
  



  const formats = [
    'header',
    'font',
    'size',
    'align',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'color',
    'background',
    'list',
    'bullet',
    'link',
    'code',
    'formula',
    // ...excludeFormats.map((format) => `-${format}`)
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([])
  const [edit, setEdit] = useState()
  const [loader, setLoader] = useState(false);
  const [add, setAdd] = useState(false)


  const inputhandler = (event) => {
    const name = event.target.name;
    const value = event.target.value
    setinfo({ ...info, [name]: value })
  }
  const handleChangeEnAns = (value) => {
    setinfo((prevState) => ({
      ...prevState,
      en_ans: value,
    }));
  };
  const handleChangeFrAns = (value) => {
    setinfo((prevState) => ({
      ...prevState,
      fr_ans: value,
    }));
  };
  const handleChangePage = (event, newPage) => {

    setPage(newPage);
  };
  const handleClose = () => {
    setinfo({
      id: "",
      en_que: '',
      en_ans: '',
      fr_que: '',
      fr_ans: '',
      priority: 0,

    })
    setEdit(false);
    setAdd(false);
  };
  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const getData = async () => {
    setLoader(true)
    await axiosApi("GET", `/faq/get-all-faq`)
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
  const sendFaq = async () => {
    const body = { en: { question: info.en_que, answer: info.en_ans }, fr: { question: info.fr_que, answer: info.fr_ans }, priority: info.priority }
    if (add) {
      await axiosApi("POST", `/faq/create-faq`, body)
        .then((res) => {
          setEdit(false);
          setinfo({
            id: "",
            en_que: '',
            en_ans: '',
            fr_que: '',
            fr_ans: '',
            priority: 0
          })
          setAdd(false)
          getData()
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const body = { en: { question: info.en_que, answer: info.en_ans }, fr: { question: info.fr_que, answer: info.fr_ans }, priority: info.priority }
      await axiosApi("PUT", `/faq/update-faq-by-id/${info.id}`, body)
        .then((res) => {
          setEdit(false);
          setinfo({
            id: "",
            en_que: '',
            en_ans: '',
            fr_que: '',
            fr_ans: '',
            priority: 0

          })
          getData()
        })
        .catch((err) => {
          console.log(err);
        });
    }

  }
  const deleteFaq = async () => {
    await axiosApi("DELETE", `/faq/delete-faq-by-id/${deleteModal}`)
      .then((res) => {
        getData()

      })
      .catch((err) => {
        console.log(err);
      });
      handleCloseDelete()
  }
  console.log("test",deleteModal,edit)
  return (
    <>
      <Helmet>
        <title> FAQ  </title>
      </Helmet>

      <Container>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            FAQ
          </Typography>
          <Button onClick={() => { setEdit(true); setAdd(true) }} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New FAQ
          </Button>
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
                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                      const { en, fr, priority } = row;

                      return (
                        <TableRow key={index}  >
                          <TableCell align="left">{priority}</TableCell>
                          <TableCell align="left">{en.question && parse(en.question)}</TableCell>
                          <TableCell style={{ display: "flex" }} align="center">
                            <img style={{ cursor: "pointer" }} src={EyeIcon} onClick={() => { console.log("click");setEdit(true); setinfo({ en_que: en.question, en_ans: en.answer, fr_que: fr.question, fr_ans: fr.answer, id: row._id, priority: row.priority }) }}></img>
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
          {"FAQ Details"}
        </DialogTitle>
        <DialogContent style={{ minWidth: "600px" }}>
          <div>
            <h4>Priority</h4>
            <TextField
              type="number"
              style={{ width: "100%" }}
              value={info?.priority}
              onChange={(e) => setinfo({ ...info, priority: e.target.value })}
            />

          </div>
          <div>
            <h4>Question (English)</h4>
            <ReactQuill
              value={info.en_que}
              onChange={(e) => setinfo({ ...info, en_que: e })}
              modules={modules}
              formats={formats}
            />
          </div>
          <div>
            <h4>Answer (English)</h4>
            <ReactQuill
              value={info.en_ans}
              onChange={handleChangeEnAns}
              modules={modules}
              formats={formats}
            />
          </div>
          <div>
            <h4>Question (French)</h4>
            <ReactQuill
              value={info.fr_que}
              onChange={(e) => setinfo({ ...info, fr_que: e })}
              modules={modules}
              formats={formats}
            />
          </div>
          <div>
            <h4>Answer (French)</h4>
            <ReactQuill
              value={info.fr_ans}
              onChange={handleChangeFrAns}
              modules={modules}
              formats={formats}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { sendFaq() }}>{add ? "Add" : "Update"}</Button>
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
          <Button onClick={() => { deleteFaq() }}>Yes</Button>
                    <Button onClick={() => { handleCloseDelete() }}>No</Button>

        </DialogActions>
      </Dialog>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

</style>
    </>
  );
}
