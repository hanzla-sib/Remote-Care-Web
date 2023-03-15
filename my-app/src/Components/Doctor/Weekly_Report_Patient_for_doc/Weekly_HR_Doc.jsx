import { Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import SimpleAreaChart from "../../Chart";


function Weekly_Hr_doc({name}) {

    const { curruser } = useContext(AuthContext);
    const [checktrue, settrue] = React.useState(false);
    const [post, setPost] = React.useState([]);
    const [error, setError] = React.useState({});

    React.useEffect(() => {
        
        async function fetchData() {
            try {
                // await delay(1000);
                const baseURL = "http://localhost:5000/mysql/getheartbeat_weekly/" + name;
                await axios.get(`${baseURL}`).then((response) => {
                    
                    post.length=0;
                    var countdig=0;
                    if(response.data.length>=7){
                        countdig=response.data.length-7;
                    }
                    
                    for(var i=countdig;i<response.data.length;i++){
                        let date_val=response.data[i].date_log;
                        let smalldate="";
                        smalldate+=date_val[5];
                        smalldate+=date_val[6];
                        smalldate+=date_val[7];
                        smalldate+=date_val[8];
                        smalldate+=date_val[9];
                        post.push({name:smalldate,uv:response.data[i].HR});
                       
                    } 
                   
                }).catch(error => {
                    setError(error);
                });
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [name]);

    return (
        <React.Fragment>
        <Grid justifyContent="flex-start" alignItems="flex-start" item sm={12} md={6} lg={5.5} sx={{ borderRadius: "30px", boxShadow: 20 , marginBottom:"30px" }}>
                    <Container sx={{ border: "1px  black", backgroundColor: "white",borderRadius: "30px", boxShadow: 20, marginBottom: "10px" }} maxWidth={false} >
                      <Typography variant="h6">Heart Beat Grpah</Typography>
                      <SimpleAreaChart arr={post} />
                    </Container>
                  </Grid>
    </React.Fragment>
    )
}

export default Weekly_Hr_doc;