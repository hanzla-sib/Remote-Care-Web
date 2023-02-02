import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import SimpleAreaChart from "../../Chart";
import Rangechart from "../../Rangechart";
function Steps_weekly_record({dat}){
    const { curruser } = useContext(AuthContext);
    const [post, setPost] = React.useState([]);
  
  const [error, setError] = React.useState({});
  React.useEffect(() => {
    console.log("---------------------------------------");
        console.log(dat.dat1);

    async function fetchData() {
        try {
            const baseURL = "http://localhost:5000/mysql/getStepsgraph_weekly_range/" + curruser.email+"/"+dat.dat1+"/"+dat.dat2;
            await axios.get(`${baseURL}`).then((response) => {
                // console.log("---------------------------------------");
                // console.log(response.data);
                // for(var j=0;j<post.length;j++){
                //     post.pop();
                // }
                post.length=0;
                var countdig=0;
                // if(response.data.length>=7){
                //     countdig=response.data.length-7;
                // }
                // console.log("''''''''''''''''''''''''''");
                // console.log(post);
                for(var i=countdig;i<response.data.length;i++){
                    let date_val=response.data[i].date_log;
                    let smalldate="";
                    smalldate+=date_val[5];
                    smalldate+=date_val[6];
                    smalldate+=date_val[7];
                    smalldate+=date_val[8];
                    smalldate+=date_val[9];
                    post.push({name:smalldate,uv:response.data[i].steps_daily});
                   
                } 
          
            }).catch(error => {
                setError(error);
            });
        } catch (e) {
            console.error(e);
        }
    };
    fetchData();
}, [dat]);
  
return (
    <React.Fragment>
    <Grid justifyContent="flex-start" alignItems="flex-start" item sm={12} md={6} lg={5} sx={{ borderRadius: "30px", boxShadow: 20 , marginBottom:"30px" }}>
                <Container sx={{ border: "1px  black", backgroundColor: "white" }} maxWidth={false} >
                  <Typography variant="h6">Steps</Typography>
                  <Rangechart arr={post} />
                </Container>
              </Grid>
</React.Fragment>)

}

export default Steps_weekly_record