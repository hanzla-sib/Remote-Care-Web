import { Button, Divider, List, ListItem, ListItemText, Typography, TextField, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Box, Stack } from "@mui/system";
import Sidebar from "./Sidebar";
import { Card, CardContent, CardMedia, Grid } from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext } from "react";
// import SimpleAreaChart from "../Chart"
import Caloriegraph from "./Caloriegraph";
import styled from "@emotion/styled";
import axios from "axios";
import { auth } from "../../Firebase/firebase-config"
import StaticTimePickerDemo from "../Time";
import SetAppoint from "./SetAppointments";
import Prescription from "./Prescription";
import Meal from "./Meal";
import { AuthContext } from "../../Context/AuthContext";
import Showappointmentsrec from "./Show_appointments_rec";
import CalorieCard from "./Cards/Caloriecard";
import StepCard from "./Cards/StepsCard";
import HeartbeatCard from "./Cards/Heartbeat";



const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
// const delay = ms => new Promise(
//   resolve => setTimeout(resolve, ms)
// );


function Home() {
  const { curruser } = useContext(AuthContext);
  const [checktrue, settrue] = React.useState(false);
  const [post, setPost] = React.useState({});
  const [error, setError] = React.useState({});
  const [reloder,setreloader]=React.useState(0);
  const [reloderappoint,setreloderappoint]=React.useState(0);
  React.useEffect(() => {
    async function fetchData() {
      try {
        // await delay(1000);
        const baseURL = "http://localhost:5000/mysql/get_user_type/" + curruser.email;
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
      <Box sx={{ background: "linear-gradient(#16222A, #3A6073);", height: { sx: "auto", md: "93.5vh", lg: "93.5vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
        <Sidebar />
      </Box>
      {/* HOMEPAGE STARTING */}
      <Box pl={"20px"} sx={{ overflowY: "auto", height: "93.5vh", flex: 2, backgroundColor: "#EEEEEE" }}>
        <Container >
          <Grid columnSpacing={{ lg: 0, sm: 1, md: 3, xs: 2 }} columnGap={{ lg: 2, md: 2, sm: 1, xs: 1 }} sx={{ margin: "auto" }} rowSpacing={4} container alignItems="center"
            justifyContent="center" direction={"row"} >


            <Grid marginRight={"20px"} maxWidth={"500px"} justifyContent="left" alignItems="center" container item sm={12} md={12} lg={12}>

              {/* showing the Dashboard */}

              <Card style={{ color: '#4AA54E', backgroundColor: '#EEEEEE', fontWeight: "bold", border: "none", boxShadow: "none" }} sx={{ maxWidth: 400 }}>
                <CardContent sx={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                  <Typography variant="h4" component="div" >
                    Patient Overview


                  </Typography>

                </CardContent>
              </Card>
            </Grid>


            <Grid marginRight={"20px"} maxWidth={"500px"} justifyContent="left" alignItems="center" container item sm={12} md={12} lg={12}>

              {/* showing the name of the user */}

              <Card style={{ color: '#4AA54E', backgroundColor: '#EEEEEE', border: "none", boxShadow: "none" }} sx={{ maxWidth: 400 }}>
                <CardContent sx={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                  <Typography variant="h5" component="div" >
                    Hi,
                    {checktrue == true ? post.name : "null"}


                  </Typography>
                  <Typography variant="body2" component="div">
                    {/* {post.typeofuser} */}
                  </Typography>
                </CardContent>
              </Card>


            </Grid>








            {/* showing Cards */}
            {/* Step Count Card */}
            <Grid justifyContent="center" alignItems="center" container item sm={5} md={3} lg={3}>
             <StepCard />
            </Grid>


            {/* Calorie Card */}
            <Grid justifyContent="center" alignItems="center" container item sm={5} md={3} lg={3}>
            <CalorieCard setreloader={reloder}/>
            </Grid>


            {/* Heart Beat Card */}
            <Grid justifyContent="center" alignItems="center" container item sm={12} md={3} lg={3}>
             <HeartbeatCard />
            </Grid>

            {/* Add Meal funtionality */}

            <Grid item xs={12} container sm={12} md={6} lg={4} justifyContent={"center"} >
              <Meal setreloader={setreloader}/>
            </Grid>


            {/* Add Prescription funtionality */}

            <Grid sx={{ marginTop: "40px" }} item xs={12} container sm={12} md={6} lg={6} justifyContent={"flex-end"} >
              <Prescription />
            </Grid>

            <Grid columnSpacing={{ lg: 0, sm: 1, md: 3, xs: 2 }} columnGap={{ lg: 2, md: 2, sm: 1, xs: 1 }} sx={{ margin: "auto" }} rowSpacing={4} container alignItems="center"
              justifyContent="center" direction={"row"} >

              {/* Graph of the Calories intake */}
              <Grid justifyContent="flex-start" alignItems="flex-start" item sm={12} md={6} lg={6} sx={{ borderRadius: "30px", boxShadow: 20, margin: "auto" }}>
                <Container sx={{ border: "1px  black", backgroundColor: "white" }} maxWidth={false} >
                  <Typography variant="h6">Calories intake</Typography>
                  <Caloriegraph setreloader={reloder}/>
                </Container>
              </Grid>


              {/* set appointmnets */}

              <Grid justifyContent="center" alignItems="center" item sm={5} md={5} lg={2}>
              <SetAppoint setreloderappoint={setreloderappoint}/>
              </Grid>


              {/* Showing Appointments */}


              <Grid maxWidth={"500px"} justifyContent="center" alignItems="center" container item sm={5} md={5} lg={2}>
               <Showappointmentsrec setreloderappoint={reloderappoint} />
               
              </Grid>


            </Grid>


          </Grid>


        </Container>
      </Box>
    </Stack>
  )
}

export default Home;