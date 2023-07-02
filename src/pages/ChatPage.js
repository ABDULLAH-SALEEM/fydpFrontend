import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import {
    Card,
    Stack,
    Container,
    Typography,
    CircularProgress,
    TextField,
} from '@mui/material';
import { axiosApi } from 'src/service/apiEnviornment';
import Button from '@mui/material/Button';
import ReactQuill from 'react-quill';
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function ChatPage() {

    const Font = Quill.import("formats/font");
    Font.whitelist = ["Arial", "times", 'Calibiri', 'serif', 'monospace', 'san', 'Calligraffitti'];
    Quill.register(Font, true);
    const [loader, setLoader] = useState(false);
    const [info, setinfo] = useState({})

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
    const handleChange = (value) => {
        setinfo((prevState) => ({
            ...prevState,
            blog: { ...prevState.blog, fr: value },
        }));
    };
    const getData = async () => {
        setLoader(true)
        await axiosApi("GET", `/chat-page/get-chat-page-by-id/646cb4bcadd6d09700851a50`)
            .then((res) => {
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
        await axiosApi("PUT", `/chat-page/update-chat-page-by-id/646cb4bcadd6d09700851a50`, info)
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
                <title> Chat  </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Chat
                    </Typography>
                   

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
                                    onChange={(e) => setinfo({ ...info, title: { ...info.title, en: e} })}
                                    formats={formats}
                                />
                                <h4>Title (French)</h4>
                                <ReactQuill
                                    value={info?.title?.fr}
                                    onChange={(e) => setinfo({ ...info, title: { ...info.title, fr: e} })}
                                    formats={formats}
                                />

                            </div>
                            <div>
                                <h4>Description (English)</h4>
                                <ReactQuill
                                    value={info?.description?.en}
                                    onChange={(e) => setinfo({ ...info, description: { ...info.description, en: e} })}                                    modules={modules}
                                    formats={formats}
                                />
                                <h4>Description (French)</h4>
                                <ReactQuill
                                    value={info?.description?.fr}
                                    onChange={(e) => setinfo({ ...info, description: { ...info.description, fr: e} })}
                                    formats={formats}
                                />
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                <Button onClick={() => { updateData() }}>Update</Button>
                            </div>


                        </div>
                    </Card>


                }
                



            </Container>
          

        </>
    );
}
