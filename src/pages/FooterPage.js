import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import {
    Card,
    Stack,
    Container,
    Typography,
    TextField,
    CircularProgress
} from '@mui/material';
import { axiosApi } from 'src/service/apiEnviornment';
import Button from '@mui/material/Button';
import ReactQuill from 'react-quill';

import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';



export default function FooterPage() {

    const Font = Quill.import("formats/font");
    Font.whitelist = ["Arial", "times", 'Calibiri', 'serif', 'monospace', 'san', 'Calligraffitti'];
    Quill.register(Font, true);

    const [loader, setLoader] = useState(false);

    const [info, setinfo] = useState({
    })

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
    const inputhandler = (event) => {
        const name = event.target.name;
        const value = event.target.value
        setinfo({ ...info, [name]: value })
    }


    const getData = async () => {
        setLoader(true)
        await axiosApi("GET", `/footer/get-footer-by-id/645f21bdd80cea338419d4b8`)
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
        await axiosApi("PUT", `/footer/update-footer-by-id/645f21bdd80cea338419d4b8`, info)
            .then((res) => {
                getData()
            })
            .catch((err) => {
                console.log(err);
            });
    }
    console.log("test", info)
    return (
        <>
            <Helmet>
                <title> Footer  </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Footer
                    </Typography>

                </Stack>
                {loader ? <div style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress />
                </div>
                    :
                    <Card>
                        <div style={{ padding: "20px" }}>
                            <div>
                                <h4>Section A (English)</h4>
                                <ReactQuill
                                    value={info?.section1?.en}
                                    onChange={(e) => setinfo({ ...info, section1: { ...info.section1, en: e } })} modules={modules}
                                    formats={formats}
                                />
                                <h4>Section A (French)</h4>
                                <ReactQuill
                                    value={info?.section1?.fr}
                                    onChange={(e) => setinfo({ ...info, section1: { ...info.section1, fr: e } })} modules={modules}
                                    formats={formats}
                                />
                            </div>
                            <div>
                                <h4>Section B (English)</h4>
                                <ReactQuill
                                    value={info?.section2?.en}
                                    onChange={(e) => setinfo({ ...info, section2: { ...info.section2, en: e } })}
                                    modules={modules}
                                    formats={formats}
                                />
                                <h4>Section B (French)</h4>
                                <ReactQuill
                                    value={info?.section2?.fr}
                                    onChange={(e) => setinfo({ ...info, section2: { ...info.section2, fr: e } })}
                                    modules={modules}
                                    formats={formats}
                                />

                            </div>
                            <div>
                                <h4>Section C (English)</h4>
                                <ReactQuill
                                    value={info?.section3?.en}
                                    onChange={(e) => setinfo({ ...info, section3: { ...info.section3, en: e } })} modules={modules}
                                    formats={formats}
                                />
                                <h4>Section C (French)</h4>
                                <ReactQuill
                                    value={info?.section3?.fr}
                                    onChange={(e) => setinfo({ ...info, section3: { ...info.section3, fr: e } })} modules={modules}
                                    formats={formats}
                                />

                            </div>
                            <div>
                                <h4>Section D (English)</h4>
                                <ReactQuill
                                    value={info?.section4?.en}
                                    onChange={(e) => setinfo({ ...info, section4: { ...info.section4, en: e } })}
                                    modules={modules}
                                    formats={formats}
                                />
                                <h4>Section D (French)</h4>
                                <ReactQuill
                                    value={info?.section4?.fr}
                                    onChange={(e) => setinfo({ ...info, section4: { ...info.section4, fr: e } })}
                                    modules={modules}
                                    formats={formats}
                                />

                            </div>
                            <div>
                                <h4>Section E (English)</h4>
                                <ReactQuill
                                    value={info?.section5?.en}
                                    onChange={(e) => setinfo({ ...info, section5: { ...info.section5, en: e } })}
                                    modules={modules}
                                    formats={formats}
                                />
                                <h4>Section E (French)</h4>
                                <ReactQuill
                                    value={info?.section5?.fr}
                                    onChange={(e) => setinfo({ ...info, section5: { ...info.section5, fr: e } })}
                                    modules={modules}
                                    formats={formats}
                                />

                            </div>
                            <div>
                                <h4>Section F (English)</h4>
                                <ReactQuill
                                    value={info?.section6?.en}
                                    onChange={(e) => setinfo({ ...info, section6: { ...info.section6, en: e } })}
                                    modules={modules}
                                    formats={formats}
                                />
                                <h4>Section F (French)</h4>
                                <ReactQuill
                                    value={info?.section6?.fr}
                                    onChange={(e) => setinfo({ ...info, section6: { ...info.section6, fr: e } })}
                                    modules={modules}
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
