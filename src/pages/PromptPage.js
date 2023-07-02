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
import PencilIcon from "../assets/edit.png"
import Priority from "../assets/trend.png"
import { Quill } from 'react-quill';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';

import Iconify from 'src/components/iconify/Iconify';
// components

import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead } from '../sections/@dashboard/user';
// mock

// ----------------------------------------------------------------------
const Font = Quill.import("formats/font");
Font.whitelist = ["Arial", "times", 'Calibiri', 'serif', 'monospace', 'san', 'Calligraffitti'];
Quill.register(Font, true);

const TABLE_HEAD = [
    { id: 'priority', label: 'Priority', alignRight: false },

    { id: 'englishCategory', label: 'English Category', alignRight: false },
    { id: 'frenchCategory', label: 'French Category', alignRight: false },
    { id: 'actions', label: 'Actions', alignRight: false },
];
const TABLE_HEAD_2 = [
    { id: 'englishTitle', label: 'English Title', alignRight: false },
    { id: 'frenchTitle', label: 'French Title', alignRight: false },
    { id: 'actions', label: 'Actions', alignRight: false },
];
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
// ----------------------------------------------------------------------




export default function PromptPage() {

    
const [currentPri,setCurrentPri]=useState(false)
const [newPri,setNewPri]=useState(0)



    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [addCat, setAddCat] = useState(false)
    const [editCat, setEditCat] = useState(false)
    const [addProm, setAddProm] = useState(false)
    const [editProm, setEditProm] = useState(false)
    // const [prompt, setPrompt] = useState([])
    const [deleteModal, setDeleteModal] = useState(false)
    const handleCloseDelete = () => {
        setDeleteModal(false)
    };
    const [deletePro, setDeletePro] = useState(false)
    const handleCloseDeletePro = () => {
        setDeletePro(false)
    };
    const handleClosePri = () => {
        setCurrentPri(false)
        setNewPri(0)
    };


    const [data, setData] = useState([])
    const [edit, setEdit] = useState()
    const [loader, setLoader] = useState(false);
    const [title, setTitle] = useState([])
    const [add, setAdd] = useState(false)
    const [prompt, setPrompt] = useState({
        index: "",
        en_title: '',
        en_prompt: '',
        fr_title: '',
        fr_prompt: '',
        // priority:0,
    })
    const [category, setCategory] = useState({
        en: "",
        fr: "",
        priority: 0,

    })


    const handleChangePage = (event, newPage) => {

        setPage(newPage);
    };
    const handleCloseCat = () => {
        setAddCat(false);
        setEditCat(false)
        setCategory({
            en: "",
            fr: "",
            priority: 0,

        })
    };
    const handleCloseProm = () => {
        setAddProm(false);
        setEditProm(false)
        setPrompt({
            index: "",
            en_title: '',
            en_prompt: '',
            fr_title: '',
            fr_prompt: '',
            // priority:0
        })
    };
    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };
    const getData = async () => {
        setLoader(true)
        await axiosApi("GET", `/prompt/get-all-prompt`)
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

    const deleteCategory = async () => {
        await axiosApi("DELETE", `/prompt/delete-prompt-by-id/${deleteModal}`)
            .then((res) => {
                getData()
                handleCloseDelete()
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const deletePrompt = async (deletePro) => {
        const body = title
        body.prompt.en.splice(deletePro, 1)
        body.prompt.fr.splice(deletePro, 1)
        body.title.en.splice(deletePro, 1)
        body.title.fr.splice(deletePro, 1)
        body.priorityPrompt.splice(deletePro, 1)

        await axiosApi("PUT", `/prompt/update-prompt-by-id/${body._id}`, body)
            .then((res) => {
                getData()
                handleCloseDeletePro()
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const addCategory = async () => {
        if (addCat) {
            const body = { category }
            await axiosApi("POST", `/prompt/create-prompt`, body)
                .then((res) => {
                    getData()
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            title.category = category
            title.priority = category.priority
            const body = title
            console.log("body", body)
            await axiosApi("PUT", `/prompt/update-prompt-by-id/${body._id}`, body)
                .then((res) => {
                    getData()
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        setAddCat(false)
        setEditCat(false)

    }
    const addPrompt = async () => {
        if (addProm) {
            title.title.en.push(prompt.en_title)
            title.title.fr.push(prompt.fr_title)
            title.prompt.en.push(prompt.en_prompt)
            title.prompt.fr.push(prompt.fr_prompt)

            console.log(title)

            await axiosApi("PUT", `/prompt/update-prompt-by-id/${title._id}`, title)
                .then((res) => {
                    getData()
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {

            title.title.en[prompt.index] = prompt.en_title
            title.prompt.en[prompt.index] = prompt.en_prompt
            title.title.fr[prompt.index] = prompt.fr_title
            title.prompt.fr[prompt.index] = prompt.fr_prompt
            title.priorityPrompt[prompt.index] = (prompt.priority)


            await axiosApi("PUT", `/prompt/update-prompt-by-id/${title._id}`, title)
                .then((res) => {
                    getData()
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        setAddProm(false)
        setEditProm(false)
    }
    function swap(array, index1, index2) {
        if (index1 < 0 || index1 >= array.length || index2 < 0 || index2 >= array.length) {
            console.error('Invalid indices');
            return;
        }

        let temp = array[index1];
        array[index1] = array[index2];
        array[index2] = temp;
    }
   async function changePriority(currentPri,newPri){
        swap(title.title.en,currentPri,newPri);
        swap(title.prompt.en,currentPri,newPri);
        swap(title.title.fr,currentPri,newPri);
        swap(title.prompt.fr,currentPri,newPri)
        await axiosApi("PUT", `/prompt/update-prompt-by-id/${title._id}`, title)
        .then((res) => {
            getData()
            
        })
        .catch((err) => {
            console.log(err);
        }); 
        handleClosePri()

    }

    return (
        <>
            <Helmet>
                <title> Category  </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Category
                    </Typography>
                    <Button onClick={() => { setAddCat(true) }} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                        New Category
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
                                            const { category, priority } = row;

                                            return (
                                                <TableRow key={index}  >
                                                    <TableCell align="left">{priority}</TableCell>
                                                    <TableCell align="left">{category.en && parse(category.en)}</TableCell>
                                                    <TableCell align="left">{category.fr && parse(category.fr)}</TableCell>
                                                    <TableCell style={{ display: "flex", justifyContent: "space-around" }} align="center">
                                                        <img style={{ cursor: "pointer" }} src={EyeIcon} onClick={() => { setTitle(row) }}></img>
                                                        <img style={{ cursor: "pointer" }} src={PencilIcon} onClick={() => { setTitle(row); setEditCat(true); setCategory({priority:row.priority,en: row.category.en, fr: row.category.fr }) }}></img>
                                                        <img style={{ cursor: "pointer" }} src={DeleteIcon} onClick={() => { setDeleteModal(row._id) }}></img>

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
            <br></br>



            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Prompt
                    </Typography>
                    <Button onClick={() => { setAddProm(true) }} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                        New Prompt
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
                                        headLabel={TABLE_HEAD_2}
                                        rowCount={title.length}
                                    />

                                    <TableBody>
                                        {title?.title?.en?.map((item, index) => {
                                            return (
                                                <TableRow key={index}  >

                                                    <TableCell align="left">{title.title.en[index] && parse(title.title.en[index])}</TableCell>
                                                    <TableCell align="left">{title.title.fr[index] && parse(title.title.fr[index])}</TableCell>

                                                    <TableCell style={{ display: "flex", justifyContent: "space-around" }} align="center">
                                                        <img style={{ cursor: "pointer" }} src={DeleteIcon} onClick={() => { setDeletePro(index) }}></img>
                                                        <img style={{ cursor: "pointer" }} src={PencilIcon} onClick={() => { setEditProm(true); setPrompt({ index: index, en_title: title.title.en[index], fr_title: title.title.fr[index], en_prompt: title.prompt.en[index], fr_prompt: title.prompt.fr[index] }) }}></img>
                                                        <img style={{ cursor: "pointer" }} src={Priority} onClick={() => {setCurrentPri(index.toString())}}></img>
                                                    </TableCell>

                                                </TableRow>
                                            );
                                        })}

                                    </TableBody>




                                </Table>
                            </TableContainer>
                        </Scrollbar>


                    </Card>
                }
            </Container>


            {/* modal for category */}
            <Dialog
                open={addCat || editCat}
                onClose={handleCloseCat}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Category Details"}
                </DialogTitle>
                <DialogContent style={{ minWidth: "600px" }}>
                    <div>
                        <h4>Priority</h4>
                        <TextField
                            type="number"
                            style={{ width: "100%" }}
                            value={category?.priority}
                            onChange={(e) => setCategory({ ...category, priority: e.target.value })}
                        />

                    </div>
                    <div>
                        <h4>Category (English)</h4>
                        <ReactQuill
                            value={category.en}
                            onChange={(e) => setCategory({ ...category, en: e })}
                            modules={modules}
                            formats={formats}
                        />
                    </div>

                    <div>
                        <h4>Category (French)</h4>
                        <ReactQuill
                            value={category.fr}
                            onChange={(e) => setCategory({ ...category, fr: e })}
                            modules={modules}
                            formats={formats}
                        />
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { addCategory() }}>{addCat ? "Post" : "Update"}</Button>
                </DialogActions>
            </Dialog>
            {/* modal for prompt */}
            <Dialog
                open={addProm || editProm}
                onClose={handleCloseProm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Category Details"}
                </DialogTitle>
                <DialogContent style={{ minWidth: "600px" }}>
                    {/* <div>
                        <h4>Priority</h4>
                        <TextField
                        style={{width:"100%"}}
                            value={prompt.priority}
                            type="number"
                            onChange={(e) => setPrompt({ ...prompt, priority: Number(e.target.value) })}
 
                        />
                    </div> */}
                    <div>
                        <h4>Title (English)</h4>
                        <ReactQuill
                            value={prompt.en_title}
                            onChange={(e) => setPrompt({ ...prompt, en_title: e })}
                            modules={modules}
                            formats={formats}
                        />
                    </div>

                    <div>
                        <h4>Title (French)</h4>
                        <ReactQuill
                            value={prompt.fr_title}
                            onChange={(e) => setPrompt({ ...prompt, fr_title: e })}
                            modules={modules}
                            formats={formats}
                        />
                    </div>
                    <div>
                        <h4>Prompt (English)</h4>
                        <TextField style={{ width: "100%" }} onChange={(e) => setPrompt({ ...prompt, en_prompt: e.target.value })} multiline={4} value={prompt.en_prompt} />
                    </div>
                    <div>
                        <h4>Prompt (French)</h4>
                        <TextField style={{ width: "100%" }} onChange={(e) => setPrompt({ ...prompt, fr_prompt: e.target.value })} multiline={4} value={prompt.fr_prompt} />

                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { addPrompt() }}>{addProm ? "Post" : "Update"}</Button>
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
                    <Button onClick={() => { deleteCategory() }}>Yes</Button>
                    <Button onClick={() => { handleCloseDelete() }}>No</Button>

                </DialogActions>
            </Dialog>
            <Dialog
                open={deletePro}
                onClose={handleCloseDeletePro}
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
                    <Button onClick={() => { deletePrompt() }}>Yes</Button>
                    <Button onClick={() => { handleCloseDeletePro() }}>No</Button>

                </DialogActions>
            </Dialog>
            <Dialog
                open={currentPri}
                onClose={handleClosePri}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Change Priority"}
                </DialogTitle>
                <DialogContent style={{ minWidth: "600px" }}>
                  <TextField value={newPri} onChange={(e)=>setNewPri(e.target.value)}></TextField>


                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { changePriority(Number(currentPri),newPri) }}>Yes</Button>
                    <Button onClick={() => { handleClosePri() }}>No</Button>

                </DialogActions>
            </Dialog>

        </>
    );
}
