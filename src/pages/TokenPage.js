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




export default function TokenPage() {
    const [loader, setLoader] = useState(false);

    const [info, setinfo] = useState({
        token:"",
        price: "",
        id:""
      
    })
    
    const inputhandler = (event) => {
        const name = event.target.name;
        const value = event.target.value
        setinfo({ ...info, [name]: value })
    }


    const getData = async () => {
        setLoader(true)
        await axiosApi("GET", `/token/get-all-token`)
            .then((res) => {
                console.log(res);
                setinfo({token:res.data.token,price:res.data.price});
            })
            .catch((err) => {
                console.log(err);
            });
        setLoader(false)

    };
    useEffect(() => {
        getData()
    }, [])
    const updateToken = async () => {
        console.log(info)
        await axiosApi("PUT", `/token/update-token-by-id/643d259ac52fa110af470b64`, info)
            .then((res) => {
                console.log(res)
                getData()
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <>
            <Helmet>
                <title> Token  </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Token
                    </Typography>

                </Stack>
                {loader ? <div style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress />
                </div>
                    :
                    <Card>
                        <div style={{padding:"20px"}}>
                        <div>
                            <h4>Tokens</h4>
                            <TextField onChange={inputhandler} value={info.token} name="token" style={{ width: "100%" }}></TextField>
                        </div>
                        <div>
                            <h4>Price</h4>
                            <TextField onChange={inputhandler} value={info.price} name="price" style={{ width: "100%" }}></TextField>
                        </div>
                        <div style={{marginTop:"10px"}}>
                            <Button onClick={()=>{updateToken()}}>Update</Button>
                        </div>
                        </div>
                    </Card>
                }
            </Container>

        </>
    );
}
