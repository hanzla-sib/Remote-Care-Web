import styled from "@emotion/styled";
import { Box, Button, ButtonBase, Card, CardContent, CardMedia, Container, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import react from "react";
import { AuthContext } from "../../Context/AuthContext";
import { auth } from "../../Firebase/firebase-config";
import SimpleAreaChart from "../Chart";
import Monthly_calories_Consumed from "./monthly_graphs/Monthly_caloriesConsumed";
import Sidebar from "./Sidebar";

import Weekly_calories_con from "./weekly_graphs/Weekly_calories_consumed";
// const delay = ms => new Promise(
//   resolve => setTimeout(resolve, ms)
// );

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
function CaloriesConsumed() {
  const { curruser } = useContext(AuthContext);
  const [checktrue,settrue]=React.useState(false);
  const [post, setPost] = React.useState({});
  const [call, setCall] = React.useState([]);
  const [error, setError] = React.useState({});
 
  React.useEffect(() => {
    
    async function fetchData() {
      try {
    // await delay(1000);
    call.push({name:"2022-12-21",uv:1000});
    const baseURL = "http://localhost:5000/Usersfunctions/read/"+curruser.email;
    // console.log("===================",auth.currentUser.email)
    // console.log("data    ",auth.currentUser);
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
                <CardContent sx={{background:"#EEEEEE"}}>
                  <Typography variant="h4" component="div" color={"#4AA54E"}>
                    Hi, MR {checktrue == true? post.Name: "null"}
                  </Typography>
                  <Typography variant="h6" component="div">
                    Calories Consumed Record.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/*  */}
           
            {/*  */}

            {/*  */}

           <Weekly_calories_con />

            {/*  */}

            {/*  */}
           <Monthly_calories_Consumed />
            {/*  */}

          </Grid>
        </Container>
      </Box>
    </Stack>
  )
}

export default CaloriesConsumed;