import styled from "@emotion/styled";
import { Box, Button, ButtonBase, Card, CardContent, CardMedia, Container, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import react from "react";
import { auth } from "../../Firebase/firebase-config";
import SimpleAreaChart from "../Chart";
import Sidebar from "./Sidebar";

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
function HeartBeat() {
  

  const [checktrue,settrue]=React.useState(false);
  const [post, setPost] = React.useState({});
  const [error, setError] = React.useState({});
 
  React.useEffect(() => {
    async function fetchData() {
      try {
    await delay(1000);
    const baseURL = "http://localhost:5000/Usersfunctions/read/"+auth.currentUser.email;
    console.log("===================",auth.currentUser.email)
    console.log("data    ",auth.currentUser);
    await axios.get(`${baseURL}`).then((response) => {
      setPost(response.data);
      settrue(true);
      
    }).catch(error => {
      setError(error);
    });
        
      } catch (e) {
          console.error(e);
          
      }
  };
  fetchData();
  }, []);
  
  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      
       <Box pl={"20px"} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Container>
          <Grid columnSpacing={{ lg: 0, sm: 1, md: 3, xs: 2 }} columnGap={{ lg: 1, md: 2, sm: 1, xs: 1 }} sx={{ margin: "auto" }} rowSpacing={4} container alignItems="center"
            justifyContent="center" direction={"row"} >

            <Grid maxWidth={"500px"} justifyContent="flex-start" alignItems="center" container item sm={6} md={3} lg={12}>
              <Card style={{ border: "none", boxShadow: "none" }} sx={{ maxWidth: 400 }}>
                <CardContent>
                  <Typography variant="h4" component="div">
                    Hi, MR {checktrue == true? post.Name: "null"}
                  </Typography>
                  <Typography variant="h6" component="div">
                    Heart Beat Record.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/*  */}
            <Grid margin={"40px 0px"} container justifyContent="flex-start" alignItems="center" item sm={6} md={3} lg={3}>
              <Card style={{ border: "none", boxShadow: "none" }} sx={{ maxWidth: 400 }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    DAILY
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid margin={"40px 0px"} container justifyContent="flex-start" alignItems="center" item sm={12} md={6} lg={6}>
              <Container sx={{ border: "1px solid black", backgroundColor: "white" }} maxWidth={false} >
                <Typography variant="body2">Graph</Typography>
                <SimpleAreaChart />
              </Container>
            </Grid>
            {/*  */}

            {/*  */}

            <Grid margin={"40px 0px"} container justifyContent="flex-start" alignItems="center" item sm={6} md={3} lg={3}>
              <Card style={{ border: "none", boxShadow: "none" }} sx={{ maxWidth: 400 }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Weekly
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid margin={"40px 0px"} container justifyContent="flex-start" alignItems="center" item sm={12} md={6} lg={6}>
              <Container sx={{ border: "1px solid black", backgroundColor: "white" }} maxWidth={false} >
                <Typography variant="body2">Graph</Typography>
                <SimpleAreaChart />
              </Container>
            </Grid>


            {/*  */}

            {/*  */}
            <Grid container justifyContent="flex-start" alignItems="center" item sm={6} md={3} lg={3}>
              <Card style={{ border: "none", boxShadow: "none" }} sx={{ maxWidth: 400 }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Monthly
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid container justifyContent="flex-start" alignItems="center" item sm={12} md={6} lg={6}>
              <Container sx={{ border: "1px solid black", backgroundColor: "white" }} maxWidth={false} >
                <Typography variant="body2">Graph</Typography>
                <SimpleAreaChart />
              </Container>
            </Grid>
            {/*  */}

          </Grid>
        </Container>
      </Box>
    </Stack>
  )
}

export default HeartBeat;
