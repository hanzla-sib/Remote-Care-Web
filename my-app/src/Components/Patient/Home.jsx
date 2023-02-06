import { Button, Divider, List, ListItem, ListItemText, Typography, TextField, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Box, Stack } from "@mui/system";
import Sidebar from "./Sidebar";
import { Card, CardContent, CardMedia, Grid } from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useRef, useState } from "react";
// import SimpleAreaChart from "../Chart"

import styled from "@emotion/styled";
import axios from "axios";
import { auth } from "../../Firebase/firebase-config"

import { AuthContext } from "../../Context/AuthContext";
import Showappointmentsrec from "./Show_appointments_rec";
import CalorieCard from "./Cards/Caloriecard";
import StepCard from "./Cards/StepsCard";
import HeartbeatCard from "./Cards/Heartbeat";
import Steps_weekly from "./weekly_graphs/Steps_weekly";
import CalorieBurnt_graph from "./weekly_graphs/Weekly_calories_burnt";
import CalorieConsumed_graph from "./weekly_graphs/Weekly_calories_consumed";
import Health_record from "./Health_Record";
import Show_old_appointment from "./Show_old_appointments_record";
import Range_weekly_steps from "./Range_graphs/Steps_weekly_range";
import Range_weekly_burnt_cal from "./Range_graphs/Weekly_calories_burnt_range";
import Tests from "./TestReports";

import Range_weekly_Intake_cal from "./Range_graphs/Weekly_calories_consumed_range";


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


function Home() {

  const [num, setNum] = useState(0);

  function randomNumberInRange(min, max) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [combinedate, setcombine] = useState([]);
  const dateInputRef = useRef(null);
  const [check1, setcheck] = useState(false);
  const handleChange = (e) => {
    setDate1(e.target.value);
  };

  const generategraph = () => {
    setcombine({ from: date1, to: date2 });
    setcheck(true);
    setNum(randomNumberInRange(1, 10000));
  };

  const handleChange1 = (e) => {
    setDate2(e.target.value);
  };
  const { curruser } = useContext(AuthContext);


  const [checktrue, settrue] = React.useState(false);
  const [post, setPost] = React.useState({});
  const [error, setError] = React.useState({});
  const [reloder, setreloader] = React.useState(0);
  const [reloderappoint, setreloderappoint] = React.useState(0);
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
  }, [num]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{ background: "linear-gradient(#16222A, #3A6073);", minWidth: "150px", height: { sx: "auto", md: "93.5vh", lg: "93.5vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
        <Sidebar />
      </Box>
      {/* HOMEPAGE STARTING */}
      <Box pl={"20px"} sx={{ overflowY: "auto", height: "93.5vh", flex: 1, backgroundColor: "#EEEEEE" }}>
        <Container disableGutters maxWidth >
          <Grid columnSpacing={{ lg: 0, sm: 1, md: 3, xs: 2 }} columnGap={{ lg: 2, md: 2, sm: 1, xs: 1 }} sx={{ margin: "auto" }} rowSpacing={4} container alignItems="center"
            justifyContent="center" direction={"row"} >
            <Grid maxWidth={"500px"} justifyContent="left" alignItems="center" container item sm={12} md={12} lg={12}>

              {/* showing the Dashboard */}

              <Card style={{ color: '#4AA54E', backgroundColor: '#EEEEEE', fontWeight: "bold", border: "none", boxShadow: "none" }} sx={{ maxWidth: 400 }}>
                <CardContent sx={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                  <Typography variant="h4" component="div" style={{
                    fontWeight: 800,
                    background: "-webkit-linear-gradient(45deg, #ffa600 30%, #003f5c 90%)",
                    webkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                    Patient Overview
                  </Typography>

                </CardContent>
              </Card>
            </Grid>










            <Grid justifyContent="space-evenly" alignItems="center" container item xs={12} sm={12} md={12} lg={12}>
              {/* showing Cards */}
              {/* Step Count Card */}
              <Grid justifyContent="center" alignItems="center" item xs={7} sm={5} md={3} lg={2}>
                <StepCard />
              </Grid>


              {/* Calorie Card */}
              <Grid justifyContent="center" alignItems="center" sx={{ marginTop: "10px" }} item xs={7} sm={5} md={3} lg={2}>
                <CalorieCard setreloader={reloder} />
              </Grid>


              {/* Heart Beat Card */}
              <Grid justifyContent="center" alignItems="center" sx={{ marginTop: "10px" }} item xs={7} sm={5} md={3} lg={2}>
                <HeartbeatCard />
              </Grid>

              {/* Showing Appointments */}


              <Grid justifyContent="center" alignItems="center" sx={{ marginTop: "10px" }} item xs={7} sm={5} md={5} lg={2}>
                <Showappointmentsrec setreloderappoint={reloderappoint} />
              </Grid>

            </Grid>


            {/* Add Meal funtionality */}
            {/* 
            <Grid item xs={12} container sm={12} md={6} lg={3} justifyContent={"center"} >
              <Meal setreloader={setreloader} />
            </Grid> */}


            {/* Add Prescription funtionality */}

            {/* <Grid sx={{ marginTop: "40px" }} item xs={12} container sm={12} md={6} lg={5} justifyContent={"flex-end"} >
              <Prescription />
            </Grid> */}

            {/* set appointmnets */}

            <Grid justifyContent="center" alignItems="center" item sm={5} md={5} lg={10}>
              <Typography variant="h5">WEEKLY RECORDS</Typography>
            </Grid>



            <Grid columnSpacing={{ lg: 0, sm: 1, md: 3, xs: 2 }} columnGap={{ lg: 2, md: 2, sm: 1, xs: 1 }} sx={{ margin: "auto" }} rowSpacing={4} container alignItems="center"
              justifyContent="center" direction={"row"} >



              {/* Graph of the Calories intake */}
              <CalorieConsumed_graph />

              {/* Graph of the Calories burned */}
              <CalorieBurnt_graph />

              {/* Graph of the Heart beat */}
              <CalorieBurnt_graph />


              {/* Graph of the steps */}
              <Steps_weekly />

            </Grid>


            <Grid justifyContent="center" alignItems="center" item sm={5} md={5} lg={10}>
              <Typography variant="h5">MONTHLY RECORDS</Typography>
            </Grid>
            <Grid columnSpacing={{ lg: 0, sm: 1, md: 3, xs: 2 }} columnGap={{ lg: 2, md: 2, sm: 1, xs: 1 }} sx={{ margin: "auto" }} rowSpacing={4} container alignItems="center"
              justifyContent="center" direction={"row"}>
              <Health_record />
            </Grid>

            <Grid justifyContent="space-evenly" alignItems="center" container item xs={12} sm={12} md={12} lg={12}>
              <Grid justifyContent="center" alignItems="center" item sm={5} md={5} lg={4}>
                <Typography variant="h5">Test Records</Typography>
                {/* <SetAppoint setreloderappoint={setreloderappoint} /> */}
                <Tests />
              </Grid>
              <Grid justifyContent="center" alignItems="center" item sm={5} md={5} lg={4}>
                <Typography variant="h5">Appointment History</Typography>
                {/* <SetAppoint setreloderappoint={setreloderappoint} /> */}
                <Show_old_appointment setreloderappoint={reloderappoint} />
              </Grid>
            </Grid>

            <Grid justifyContent="center" alignItems="center" item sm={5} md={5} lg={10}>
              <Typography variant="h5">Range Records</Typography>
            </Grid>
            <Grid justifyContent="center" alignItems="center" item sm={5} md={5} lg={10}>
              <Grid>
                <Typography>FROM</Typography>
                <input
                  type="date"
                  onChange={handleChange}
                  ref={dateInputRef}
                />
                <Typography>To</Typography>
                <input
                  type="date"
                  onChange={handleChange1}
                  ref={dateInputRef}
                />
                <Button variant="contained" onClick={generategraph}>generate Graph</Button>
              </Grid>

            </Grid>
            {check1 == true ? <Grid columnSpacing={{ lg: 0, sm: 1, md: 3, xs: 2 }} columnGap={{ lg: 2, md: 2, sm: 1, xs: 1 }} sx={{ margin: "auto" }} rowSpacing={4} container alignItems="center"
              justifyContent="center" direction={"row"}>
              <Range_weekly_steps dat={{ dat1: date1, dat2: date2 }} />
              <Range_weekly_burnt_cal dat={{ dat1: date1, dat2: date2 }} />
              <Range_weekly_Intake_cal dat={{ dat1: date1, dat2: date2 }} />
            </Grid> : ""}



          </Grid>
        </Container>
      </Box>
    </Stack>
  )
}

export default Home;