import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import {
    Card,
    Stack,
    Container,
    Typography,
    TextField,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { axiosApi } from 'src/service/apiEnviornment';
import Button from '@mui/material/Button';
import ReactQuill from 'react-quill';
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';




export default function HomePage() {

    const Font = Quill.import("formats/font");
    Font.whitelist = ["Arial", "times", 'Calibiri', 'serif', 'monospace', 'san', 'Calligraffitti'];
    Quill.register(Font, true);
    const [loader, setLoader] = useState(false);

    const [info, setinfo] = useState({
    })
    const [dailog, setDailog] = useState()
    const [openModal, setOpenModal] = useState()
    const inputhandler = (event) => {
        const name = event.target.name;
        const value = event.target.value
        setinfo({ ...info, [name]: value })
    }
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
        await axiosApi("GET", `/home/get-home-by-id/6464efa4f2e71f75e7429c93`)
            .then((res) => {
                console.log(res.data)
                setinfo(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        setLoader(false)

    };
    useEffect(() => {
        getData()
    }, [])
    const updateData = async () => {
        console.log(info)
        await axiosApi("PUT", `/home/update-home-by-id/6464efa4f2e71f75e7429c93`, info)
            .then((res) => {
                getData()
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const handleClose = () => {
        setDailog(false);
        setOpenModal(false)
    };


    const handleHeadEn = (event) => {
        // const { value } = event.target;
        setinfo((prevState) => {
            const middleCopy = [...prevState.middle];
            middleCopy[dailog].head.en = event;
            return { ...prevState, middle: middleCopy };
        });
    };
    const handleHeadFr = (event) => {
        // const { value } = event.target;
        setinfo((prevState) => {
            const middleCopy = [...prevState.middle];
            middleCopy[dailog].head.fr = event;
            return { ...prevState, middle: middleCopy };
        });
    };

    const handleBodyEn = (value) => {
        setinfo((prevState) => {
            const middleCopy = [...prevState.middle];
            middleCopy[dailog].body.en = value;
            return { ...prevState, middle: middleCopy };
        });
    };
    const handleBodyFr = (value) => {
        setinfo((prevState) => {
            const middleCopy = [...prevState.middle];
            middleCopy[dailog].body.fr = value;
            return { ...prevState, middle: middleCopy };
        });
    };

    const handleFooterEn = (event) => {
        // const { value } = event.target;
        setinfo((prevState) => {
            const middleCopy = [...prevState.middle];
            middleCopy[dailog].footer.en = event;
            return { ...prevState, middle: middleCopy };
        });
    };
    const handleFooterFr = (event) => {
        // const { value } = event.target;
        setinfo((prevState) => {
            const middleCopy = [...prevState.middle];
            middleCopy[dailog].footer.fr = event;
            return { ...prevState, middle: middleCopy };
        });
    };


    return (
        <>
            <Helmet>
                <title> Home  </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Home
                    </Typography>

                </Stack>
                {loader ? <div style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress />
                </div>
                    :
                    <Card>
                        <div style={{ padding: "20px" }}>
                            <div>
                                <h4>Start (English)</h4>
                                <ReactQuill
                                    value={info?.start?.en}
                                    onChange={(e) => setinfo({ ...info, start: { ...info.start, en: e } })} modules={modules}
                                    formats={formats}
                                />
                                <h4>Start (French)</h4>
                                <ReactQuill
                                    value={info?.start?.fr}
                                    onChange={(e) => setinfo({ ...info, start: { ...info.start, fr: e } })} modules={modules}
                                    formats={formats}
                                />

                            </div>
                            <div>
                                <h4>End (English)</h4>
                                <ReactQuill
                                    value={info?.end?.en}
                                    onChange={(e) => setinfo({ ...info, end: { ...info.end, en: e } })} modules={modules}
                                    formats={formats}
                                />
                                <h4>End (English)</h4>
                                <ReactQuill
                                    value={info?.end?.fr}
                                    onChange={(e) => setinfo({ ...info, end: { ...info.end, fr: e } })} modules={modules}
                                    formats={formats}
                                />

                            </div>


                        </div>
                    </Card>


                }
                <br></br>
                {loader ? <div style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress />
                </div>
                    :
                    <Card>
                        <div style={{ padding: "20px" }}>
                            <div>
                                <h4>Middle</h4>
                                {
                                    info?.middle?.map((item, index) => {
                                        return (
                                            <div style={{ cursor: "pointer" }} onClick={() => { setDailog(index); setOpenModal(true) }}>
                                                <p >{item.head.en && parse(item.head.en)}</p>
                                            </div>
                                        )
                                    })
                                }

                            </div>


                            <div style={{ marginTop: "10px" }}>
                                <Button onClick={() => { updateData() }}>Update</Button>
                            </div>
                        </div>
                    </Card>}
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
                                <h4>Head (English)</h4>
                                <ReactQuill
                                    value={info.middle[dailog].head.en}
                                    onChange={handleHeadEn}
                                    modules={modules}
                                    formats={formats}
                                />
                                <h4>Head (French)</h4>
                                <ReactQuill
                                    value={info.middle[dailog].head.fr}
                                    onChange={handleHeadFr}
                                    modules={modules}
                                    formats={formats}
                                />


                            </div>
                            <div>
                                <h4>Body (English)</h4>
                                <ReactQuill
                                    value={info.middle[dailog].body.en}
                                    onChange={handleBodyEn}
                                    modules={modules}
                                    formats={formats}
                                />
                                <h4>Body (French)</h4>
                                <ReactQuill
                                    value={info.middle[dailog].body.fr}
                                    onChange={handleBodyFr}
                                    formats={formats}
                                    modules={modules}

                                />

                            </div>
                            <div>
                                <h4>Footer (English)</h4>
                                <ReactQuill
                                    value={info.middle[dailog].footer.en}
                                    onChange={handleFooterEn}
                                    modules={modules}
                                    formats={formats}
                                />
                                <h4>Footer (French)</h4>
                                <ReactQuill
                                    value={info.middle[dailog].footer.fr}
                                    onChange={handleFooterFr}
                                    modules={modules}
                                    formats={formats}
                                />

                            </div>


                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose()}>Close</Button>

                    </DialogActions>
                </Dialog>
                : null}

        </>
    );
}
