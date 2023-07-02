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
import Scrollbar from '../components/scrollbar';
import { UserListHead } from '../sections/@dashboard/user';
import PencilIcon from "../assets/edit.png"
import DeleteIcon from "../assets/trash.png"
import moment from "moment"
import Iconify from 'src/components/iconify/Iconify';
import { axiosApi } from 'src/service/apiEnviornment';
import Button from '@mui/material/Button';
import ReactQuill from 'react-quill';
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';

const TABLE_HEAD = [
    { id: 'priority', label: 'Priority', alignRight: false },
    { id: 'title', label: 'Title', alignRight: false },
    { id: 'authorName', label: 'Author Name', alignRight: false },
    { id: 'action', label: 'Action', alignRight: false },
];


export default function BlogPage() {

    const Font = Quill.import("formats/font");
    Font.whitelist = ["Arial", "times", 'Calibiri', 'serif', 'monospace', 'san', 'Calligraffitti'];
    Quill.register(Font, true);

    const [loader, setLoader] = useState(false);
    const [loaderBlogs, setLoaderBlogs] = useState(false);
    const [blogs, setBlogs] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [specificBlog, setSpecificBlog] = useState(
        {
            title: { en: '', fr: '' },
            blog: { en: '', fr: '' },
            authorName: { en: '', fr: '' },
            authorDescription: { en: '', fr: '' },
            issueDate: "",
            priority: 0,
        }
    )
    const [edit, setEdit] = useState(false)
    const [info, setinfo] = useState({})
    const [openModal, setOpenModal] = useState()
    const [deleteModal,setDeleteModal]=useState(false)
    const handleCloseDelete = () => {
     setDeleteModal(false)
    };
  

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
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
        // ...Object.fromEntries(excludeModules.map((module) => [module, false])
        // )
    };
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
        // ...excludeFormats.map((format) => `-${format}`
        // )
    ];

    const getData = async () => {
        setLoader(true)
        await axiosApi("GET", `/blog-page/get-blog-page-by-id/64675d0b5f8d2ce779906d6b`)
            .then((res) => {
                setinfo(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        setLoader(false)

    };
    const getBlogs = async () => {
        setLoaderBlogs(true)
        await axiosApi("GET", `/blog/get-all-blog`)
            .then((res) => {
                setBlogs(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        setLoaderBlogs(false)

    };
    useEffect(() => {
        getData()
        getBlogs()
    }, [])
    const updateData = async () => {
        await axiosApi("PUT", `/blog-page/update-blog-page-by-id/64675d0b5f8d2ce779906d6b`, info)
            .then((res) => {
                getData()
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const updateBlogData = async () => {
        console.log(specificBlog)
        await axiosApi("PUT", `/blog/update-blog-by-id/${specificBlog._id}`, specificBlog)
            .then((res) => {
                getBlogs()
                handleClose()
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const addBlogData = async () => {
        console.log(specificBlog)
        await axiosApi("POST", `/blog/create-blog`, specificBlog)
            .then((res) => {
                getBlogs()
                handleClose()
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const handleClose = () => {
        setOpenModal(false)
        setSpecificBlog({
            title: { en: '', fr: '' },
            blog: { en: '', fr: '' },
            authorName: { en: '', fr: '' },
            authorDescription: { en: '', fr: '' },
            issueDate: "",
            priority: 0,

        })
    };



    const handleBlogEnChange = (value) => {
        setSpecificBlog((prevState) => ({
            ...prevState,
            blog: { ...prevState.blog, en: value },
        }));
    };
    const handleBlogFrChange = (value) => {
        setSpecificBlog((prevState) => ({
            ...prevState,
            blog: { ...prevState.blog, fr: value },
        }));
    };
    const del = async () => {
        await axiosApi("DELETE", `/blog/delete-blog-by-id/${deleteModal}`)
            .then((res) => {
                getBlogs()
                handleCloseDelete()
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <>
            <Helmet>
                <title> Blog  </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Blog
                    </Typography>
                    <Button onClick={() => { setOpenModal(true); setEdit(false) }} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                        New Blog
                    </Button>

                </Stack>
                {loader ? <div style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress />
                </div>
                    :
                    <Card>
                        <div style={{ padding: "20px" }}>
                            <div>
                                <h4>Title (English)</h4>
                                <ReactQuill
                                    value={info?.title?.en}
                                    onChange={(e) => setinfo({ ...info, title: { ...info.title, en: e } })} modules={modules}
                                    formats={formats}
                                />
                                <h4>Title (French)</h4>
                                <ReactQuill
                                    value={info?.title?.fr}
                                    onChange={(e) => setinfo({ ...info, title: { ...info.title, fr: e } })} modules={modules}
                                    formats={formats}
                                />

                            </div>
                            <div>
                                <h4>Description (English)</h4>
                                <ReactQuill
                                    value={info?.description?.en}
                                    onChange={(e) => setinfo({ ...info, description: { ...info.description, en: e } })} modules={modules}
                                    formats={formats}
                                />
                                <h4>Description (French)</h4>
                                <ReactQuill
                                    value={info?.description?.fr}
                                    onChange={(e) => setinfo({ ...info, description: { ...info.description, fr: e } })} modules={modules}
                                    formats={formats}
                                />
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                <Button onClick={() => { updateData() }}>Update</Button>
                            </div>


                        </div>
                    </Card>


                }
                <br></br>
                {loaderBlogs ? <div style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress />
                </div>
                    :
                    <Card>

                        <Scrollbar>
                            <TableContainer sx={{ minWidth: 800 }}>
                                <Table>
                                    <UserListHead
                                        headLabel={TABLE_HEAD}
                                        rowCount={blogs.length}
                                    />

                                    <TableBody>
                                        {blogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                            const { title, blog, authorName, authorDescription, _id, issueDate, priority } = row;

                                            return (
                                                <TableRow key={index}  >
                                                    <TableCell align="left">{priority}</TableCell>
                                                    <TableCell align="left">{title.en && parse(title.en)}</TableCell>
                                                    <TableCell align="left">{authorName.en && parse(authorName.en)}</TableCell>

                                                    <TableCell style={{ display: "flex" }} align="center">
                                                        <img style={{ cursor: "pointer", marginLeft: "15px" }} src={PencilIcon} onClick={() => { setEdit(true); setOpenModal(true); setSpecificBlog({ title, blog, authorName, authorDescription, _id, issueDate, priority }) }}></img>
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
                            count={blogs.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Card>
                }



            </Container>
            {openModal ?
                <Dialog
                    open={openModal}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Update Section"}
                    </DialogTitle>
                    <DialogContent style={{ minWidth: "600px" }}>
                        <div style={{ padding: "20px" }}>
                            <div>
                                <h4>Title (English)</h4>
                                <ReactQuill
                                    value={specificBlog.title.en}
                                    onChange={(e) => setSpecificBlog({ ...specificBlog, title: { ...specificBlog.title, en: e } })} modules={modules}
                                    formats={formats}
                                />
                                <h4>Title (French)</h4>
                                <ReactQuill
                                    value={specificBlog.title.fr}
                                    onChange={(e) => setSpecificBlog({ ...specificBlog, title: { ...specificBlog.title, fr: e } })}
                                    modules={modules}
                                    formats={formats}
                                />
                            </div>
                            <div>
                                <h4>Priority</h4>
                                <TextField
                                    type="number"
                                    style={{ width: "100%" }}
                                    value={specificBlog?.priority}
                                    onChange={(e) => setSpecificBlog({ ...specificBlog, priority: e.target.value })}
                                />

                            </div>
                            <div>
                                <h4>Issue Date</h4>
                                <TextField
                                    type="date"
                                    style={{ width: "100%" }}
                                    value={moment(new Date(specificBlog?.issueDate)).format("YYYY-MM-DD")}
                                    onChange={(e) => setSpecificBlog({ ...specificBlog, issueDate: e.target.value })}
                                />

                            </div>
                            <div>
                                <h4>Author Name (English)</h4>
                                <ReactQuill
                                    value={specificBlog.authorName.en}
                                    onChange={(e) => setSpecificBlog({ ...specificBlog, authorName: { ...specificBlog.authorName, en: e } })}
                                    modules={modules}
                                    formats={formats}
                                />
                                <h4>Author Name (French)</h4>
                                <ReactQuill
                                    value={specificBlog.authorName.fr}
                                    onChange={(e) => setSpecificBlog({ ...specificBlog, authorName: { ...specificBlog.authorName, fr: e } })}
                                    modules={modules}
                                    formats={formats}
                                />

                            </div>
                            <div>
                                <h4>Author Description (English)</h4>
                                <ReactQuill
                                    value={specificBlog.authorDescription.en}
                                    onChange={(e) => setSpecificBlog({ ...specificBlog, authorDescription: { ...specificBlog.authorDescription, en: e } })}
                                    modules={modules}
                                    formats={formats}
                                />
                                <h4>Author Description (French)</h4>
                                <ReactQuill
                                    value={specificBlog.authorDescription.fr}
                                    onChange={(e) => setSpecificBlog({ ...specificBlog, authorDescription: { ...specificBlog.authorDescription, fr: e } })}
                                    modules={modules}
                                    formats={formats}
                                />

                            </div>
                            <div>
                                <h4>Blog (English)</h4>
                                <ReactQuill
                                    value={specificBlog.blog.en}
                                    onChange={handleBlogEnChange}
                                    modules={modules}
                                    formats={formats}
                                />
                                <h4>Blog (French)</h4>
                                <ReactQuill
                                    value={specificBlog.blog.fr}
                                    onChange={handleBlogFrChange}
                                    formats={formats}
                                    modules={modules}
                                />
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        {edit
                            ?
                            <Button onClick={() => updateBlogData()}>Update</Button>
                            :
                            <Button onClick={() => addBlogData()}>Add</Button>
                        }

                    </DialogActions>
                </Dialog>
                : null}
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
