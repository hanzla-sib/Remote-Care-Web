import { Button, Card, CardContent, CardMedia, Divider, FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import React, { useContext } from "react";
import SimpleAreaChart from "./DocChartforPat";
import DoctorSidebar from "./DoctorSidebar";
import StaticTimePickerDemo from "../Time";
import { AuthContext } from "../../Context/AuthContext";
import AppointmentsRequest from "./AppointmentsRequests";
import RejectAppoint from "./Rejectorappoint";
import Appointmnet_History from "./AppointmentHistory";
import axios from "axios";

import Monthly_calories_Burnt_Admin from "./Monthly_Report_patients_for_doc/Monthly_Calories_Burnt_doc";
import Monthly_calories_Consumed_Admin from "./Monthly_Report_patients_for_doc/Monthly_caloriesConsumed_doc";
import Steps_Monthly_Admin from "./Monthly_Report_patients_for_doc/Monthly_steps_doc";
import CalorieBurnt_graph_admin from "./Weekly_Report_Patient_for_doc/CalorieBurnt_graph_doc";
import CalorieConsumed_graph_admin from "./Weekly_Report_Patient_for_doc/CalorieConsumed_graph_doc";
import Steps_weekly_admin from "./Weekly_Report_Patient_for_doc/Steps_weekly_doc";





function DoctorHome() {
  const [num, setNum] = React.useState(0);
  const { curruser } = useContext(AuthContext);
  const [checktrue, settrue] = React.useState(false);
  const [post, setPost] = React.useState({});
  const [error, setError] = React.useState({});
  const [reloder, setreloader] = React.useState(0);

  const [check, setcheck] = React.useState(false);
  const [patient, setPatient] = React.useState('');
  const [pats, setpats] = React.useState([]);
  const handleChange = (event) => {
    setcheck(true);
    setPatient(event.target.value);
    setNum(randomNumberInRange(1, 100000));

  };

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


    async function fetchData1() {
      var array1 = [];
      try {

        const baseURL = "http://localhost:5000/mysql/get_all_patients_fordoc/" + curruser.email;
        await axios.get(`${baseURL}`).then((response) => {
          console.log("ADMINPATIETNDATA");
          console.log(response.data);

          for (var i = 0; i < response.data.length; i++) {

            array1[i] = response.data[i].p_email;
          }
          setpats(array1);
        }).catch(error => {
        });
      } catch (e) {
        console.error(e);
      }
    };
    fetchData1();

  }, [num]);



  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }



  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{ backgroundColor: "#293148", height: { sx: "auto", md: "93.5vh" },minWidth: "200px", borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
        <DoctorSidebar />
      </Box>
      {/* HOMEPAGE STARTING */}
      <Box pl={"20px"} sx={{ overflowY: "auto", height: "93.5vh", flex: 2 }}>
        <Container disableGutters maxWidth>
          <Grid columnSpacing={{ lg: 0, sm: 1, md: 3, xs: 2 }} columnGap={{ lg: 2, md: 2, sm: 1, xs: 1 }} sx={{ margin: "auto" }} rowSpacing={4} container alignItems="center"
            justifyContent="space-evenly" direction={"row"} >


            {/* showing the Dashboard */}

            <Grid maxWidth={"600px"} justifyContent="left" alignItems="center" container item sm={12} md={12} lg={12}>
              <Card style={{ color: '#4AA54E', fontWeight: "bold", border: "none", boxShadow: "none" }} sx={{ maxWidth: 400 }}>
                <CardContent sx={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                  <Typography variant="h4" component="div" style={{
                    fontWeight: 800,
                    background: "-webkit-linear-gradient(45deg, #ffa600 30%, #003f5c 90%)",
                    webkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                    Doctors Overview
                  </Typography>

                </CardContent>
              </Card>
            </Grid>






            {/*--------------------------------------------------------*/}


            <Grid maxWidth={"600px"} justifyContent="center" justifyItems="center" alignItems="center" container item sm={5} md={5} lg={5}>
              <Typography style={{ color: "black" }} align="center" variant="h6">Current Appointments Status</Typography>
              <AppointmentsRequest setreloader={reloder} />
            </Grid>

            {/* -------------------------------------- */}





            {/* Appointmnet History  */}

            <Grid maxWidth={"600px"} justifyContent="center" alignItems="center" container item sm={5} md={5} lg={5}>
              <Typography style={{ color: "black" }} align="center" variant="h6">Appointments_History</Typography>
              <Appointmnet_History setreloader={reloder} />
            </Grid>

            {/* -------------------------------------- */}


            {/* showing the dropdown menu for selecting patients */}


            <Grid justifyContent="center" alignItems="center" item sm={12} md={6} lg={6}>
              <Box sx={{ minWidth: 120 }}>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Patient</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={patient}
                    label="Age"
                    onChange={handleChange}
                  >
                    {pats.map((emaill) => (
                      <MenuItem value={emaill}>{emaill}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>


            {/*--------------------------------------------------------*/}




            {check ?
              <Grid columnSpacing={{ lg: 0, sm: 1, md: 3, xs: 2 }} columnGap={{ lg: 2, md: 2, sm: 1, xs: 1 }} sx={{ margin: "auto" }} rowSpacing={4} container alignItems="center"
                justifyContent="left" direction={"row"} >
                <Grid container item xs={12} sm={12} md={12} lg={12}>
                  <Typography textAlign="center">Monthly</Typography>
                </Grid>
                <Monthly_calories_Consumed_Admin name={patient} />
                <Monthly_calories_Burnt_Admin name={patient} />
                <Monthly_calories_Burnt_Admin name={patient} />
                <Steps_Monthly_Admin name={patient} />
                <Grid container item xs={12} sm={12} md={12} lg={12}>
                  <Typography textAlign="center">Weekly</Typography>
                </Grid>
                <CalorieConsumed_graph_admin name={patient} />
                <CalorieBurnt_graph_admin name={patient} />
                <CalorieBurnt_graph_admin name={patient} />
                <Steps_weekly_admin name={patient} />

              </Grid> : ""}








          </Grid>

        </Container>
      </Box>
    </Stack>
  )
}


export default DoctorHome;



