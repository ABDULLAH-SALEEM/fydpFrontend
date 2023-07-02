import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import 'typeface-roboto';
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
    CircularProgress,
    Grid,
    Box
} from '@mui/material';
import { axiosApi } from 'src/service/apiEnviornment';
import Button from '@mui/material/Button';
import EyeIcon from "../assets/eye.png"
import DeleteIcon from "../assets/trash.png"
import ReactQuill from 'react-quill';
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';
import Iconify from 'src/components/iconify/Iconify';
// components

import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead } from '../sections/@dashboard/user';
// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'title', label: 'Title', alignRight: false },
    { id: 'tokens', label: 'Token', alignRight: false },
    { id: 'type', label: 'Type', alignRight: false },
    { id: 'buyPrice', label: 'Buy Price', alignRight: false },
    { id: 'salePrice', label: 'sale Price', alignRight: false },
    { id: 'details', label: 'Details', alignRight: false },
];

// ----------------------------------------------------------------------




export default function PackagePage() {
    const Font = Quill.import("formats/font");
    Font.whitelist = ["Arial", "times", 'Calibiri', 'serif', 'monospace', 'san', 'Calligraffitti'];
    Quill.register(Font, true);
    
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
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [data, setData] = useState([])
    const [edit, setEdit] = useState()
    const [loader, setLoader] = useState(false);
    const [add, setAdd] = useState(false)
    const [info, setinfo] = useState({
        id: "",
        title: { en: '', fr: '' },
        description: { en: '', fr: '' },
        save: { en: '', fr: '' },
        help: { en: '', fr: '' },


        type: '',
        buyPrice: [],
        salePrice: [],
        tokens: '',
        price: [],
        words: []
    })

    const inputhandler = (event) => {
        const name = event.target.name;
        const value = event.target.value

        if (name == "en" || name == "fr") {
            setinfo({ ...info, title: { ...info.title, [name]: value } })
        }
        else if (name == "buyPrice0" || name == "salePrice0" || name == "salePrice1" || name == "buyPrice1" || name == "price1" || name == "price0" || name == "words1" || name == "words0") {
            const index = name.slice(-1)
            if (index == "0") {
                const newName = name.replace(index, "")
                setinfo({ ...info, [newName]: [value, info[newName][1]] })

            } else if (index == "1") {
                const newName = name.replace(index, "")

                setinfo({ ...info, [newName]: [info[newName][0], value] })

            }
        }
        else {
            setinfo({ ...info, [name]: value })

        }
    }

    console.log(edit)
    const handleChangePage = (event, newPage) => {

        setPage(newPage);
    };
    const handleClose = () => {
        setEdit(false);
        setAdd(false);

        setinfo({
            id: "",
            title: { en: '', fr: '' },
            description: { en: '', fr: '' },
            save: { en: '', fr: '' },

            type: '',
            buyPrice: [],
            salePrice: [],
            tokens: '',
            price: [],
            words: []

        })
    };
    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };
    const getData = async () => {
        setLoader(true)
        await axiosApi("GET", `/package/get-all-package`)
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
    const updatePackage = async () => {

        await axiosApi("PUT", `/package/update-package-by-id/${info.id}`, info)
            .then((res) => {
                setEdit(false);
                setinfo({
                    id: "",
                    title: { en: '', fr: '' },
                    description: { en: '', fr: '' },
                    save: { en: '', fr: '' },

                    type: '',
                    buyPrice: [],
                    salePrice: [],
                    tokens: '',
                    price: [],
                    words: []


                })
                getData()
            })
            .catch((err) => {
                console.log(err);
            });


    }
    console.log("data", info)


    return (
        <>
            <Helmet>
                <title> Package </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Package
                    </Typography>

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
                                            const { description, save, title, buyPrice, salePrice, type, tokens, price, words, help } = row;

                                            return (
                                                <TableRow key={index}  >
                                                    <TableCell align="left">{title.en && parse(title.en)}</TableCell>
                                                    <TableCell align="left">{tokens[0]}</TableCell>
                                                    <TableCell align="left">{type[0]}</TableCell>
                                                    <TableCell align="left">{buyPrice[0]}</TableCell>
                                                    <TableCell align="left">{salePrice[0]}</TableCell>

                                                    <TableCell style={{ display: "flex" }} align="center">
                                                        <img style={{ cursor: "pointer", marginLeft: "15px" }} src={EyeIcon} onClick={() => { setEdit(true); setinfo({ description, save, title, buyPrice, salePrice, type, tokens, id: row._id, price, words, help }) }}></img>

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
                    {"Package Details"}

                </DialogTitle>
                <DialogContent style={{ minWidth: "600px" }}>
                    <div>
                        <h4>Title (English)</h4>
                        <ReactQuill
                            value={info?.title?.en}
                            onChange={(e) => setinfo({ ...info, title: { ...info.title, en: e } })}
                            modules={modules}
                            formats={formats}
                        />
                    </div>
                    <div>
                        <h4>Title (French)</h4>
                        <ReactQuill
                            value={info?.title?.fr}
                            onChange={(e) => setinfo({ ...info, title: { ...info.title, fr: e } })}
                            modules={modules}
                            formats={formats}
                        />
                    </div>
                    <div>
                        <h4>Description (English)</h4>
                        <ReactQuill
                            value={info?.description?.en}
                            onChange={(e) => setinfo({ ...info, description: { ...info.description, en: e } })}
                            modules={modules}
                            formats={formats}
                        />
                    </div>
                    <div>
                        <h4>Description (French)</h4>
                        <ReactQuill
                            value={info?.description?.fr}
                            onChange={(e) => setinfo({ ...info, description: { ...info.description, fr: e } })}
                            modules={modules}
                            formats={formats}
                        />
                    </div>
                    <div>
                        <h4>Save (English)</h4>
                        <ReactQuill
                            value={info?.save?.en}
                            onChange={(e) => setinfo({ ...info, save: { ...info.save, en: e } })}
                            modules={modules}
                            formats={formats}
                        />
                    </div>
                    <div>
                        <h4>Save (French)</h4>
                        <ReactQuill
                            value={info?.save?.fr}
                            onChange={(e) => setinfo({ ...info, save: { ...info.save, fr: e } })}
                            modules={modules}
                            formats={formats}
                        />
                    </div>
                    <div>
                        <h4>Help (English)</h4>
                        <ReactQuill
                            value={info?.help?.en}
                            onChange={(e) => setinfo({ ...info, help: { ...info.help, en: e } })}
                            modules={modules}
                            formats={formats}
                        />
                    </div>
                    <div>
                        <h4>Help (French)</h4>
                        <ReactQuill
                            value={info?.help?.fr}
                            onChange={(e) => setinfo({ ...info, help: { ...info.help, fr: e } })}
                            modules={modules}
                            formats={formats}
                        />
                    </div>

                    <div>
                        <h4>Buy Price</h4>
                        <Box display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"} gap={2}>
                            <Grid xs={6} md={6}>
                                <TextField type="number" onChange={inputhandler} value={info?.buyPrice[0]} name="buyPrice0" ></TextField>
                            </Grid>
                            <Grid xs={6} md={6}>
                                <TextField type="number" onChange={inputhandler} value={info?.buyPrice[1]} name="buyPrice1" ></TextField>
                            </Grid>
                        </Box>
                    </div>
                    <div>
                        <h4>Sale Price</h4>
                        <Box display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"} gap={2}>
                            <Grid xs={6} md={6}>
                                <TextField type="number" onChange={inputhandler} value={info?.salePrice[0]} name="salePrice0" ></TextField>
                            </Grid>
                            <Grid xs={6} md={6}>
                                <TextField type="number" onChange={inputhandler} value={info?.salePrice[1]} name="salePrice1" ></TextField>
                            </Grid>
                        </Box>
                    </div>
                    <div >
                        <h4>Price Id</h4>
                        <Box display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"} gap={2}>
                            <Grid xs={6} md={6}>
                                <TextField onChange={inputhandler} value={info?.price[0]} name="price0" ></TextField>
                            </Grid>
                            <Grid xs={6} md={6}>
                                <TextField onChange={inputhandler} value={info?.price[1]} name="price1" ></TextField>
                            </Grid>
                        </Box>
                    </div>
                    <div>
                        <h4>Words</h4>
                        <Box display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"} gap={2}>
                            <Grid xs={6} md={6}>
                                <TextField type="number" onChange={inputhandler} value={info?.words[0]} name="words0" ></TextField>
                            </Grid>
                            <Grid xs={6} md={6}>
                                <TextField type="number" onChange={inputhandler} value={info?.words[1]} name="words1" ></TextField>
                            </Grid>
                        </Box>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { updatePackage() }}>Update</Button>
                </DialogActions>
            </Dialog>

        </>
    );
}
