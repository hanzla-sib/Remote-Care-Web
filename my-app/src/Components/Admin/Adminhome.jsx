import { Button, Divider, List, ListItem, ListItemText, Typography, TextField, Accordion, AccordionSummary, AccordionDetails, CardActions } from "@mui/material";
import { Box, Stack } from "@mui/system";
import Sidebaradmin from "./SidebarAdmin";
import { Card, CardContent, CardMedia, Grid } from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useRef, useState } from "react";
// import SimpleAreaChart from "../Chart"


import axios from "axios";

import { AuthContext } from "../../Context/AuthContext";

import Patient_data from "./PatientsData";



function Adminhome() {
  const [num, setNum] = useState(0);
const [selected_user,setselected]=React.useState("");

  const [check, setcheck] = React.useState(false);
  const [check1, setcheck1] = React.useState(false);
  const [checktrue, settrue] = React.useState(false);
  const [doctor, setdoctors] = React.useState([]);
  const [patietns, setpatients] = React.useState([]);
  const [error, setError] = React.useState({});
  // const [filteredList, setFilteredList] = new useState(patietns);
  const [getallpastapppointdoc, fetallpastappointdoc] = React.useState([{}]);

  const [fetchcurrentdoc, fetch_curr_doc_appoint] = React.useState([{}]);

  const [getallapppointpatient_past, fetallappointpatient_past] = React.useState([{}]);

  const [fetchcurrent_patient_current, fetch_curr_patient_appoint_current] = React.useState([{}]);

  React.useEffect(() => {
    async function fetchData() {

      try {
        // await delay(1000);
        const baseURL = "http://localhost:5000/mysql/get_all_users_admin";
        await axios.get(`${baseURL}`).then((response) => {

          doctor.length = 0;
          patietns.length = 0;

          for (var i = 0; i < response.data.length; i++) {

            if (response.data[i].user_type === '1') {

              patietns.push({ name1: response.data[i].name, email: response.data[i].email });

            }
            else if (response.data[i].user_type === '2') {
              doctor.push({ name1: response.data[i].name, email: response.data[i].email })
            }
          }
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

  function randomNumberInRange(min, max) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const filterBySearchpat = (event) => {
    // Access input value

    const query = event.target.value;

    if (query === '') {

      setNum(randomNumberInRange(1, 10000000))
      
    }
    else {
      var updatedList = [...patietns];
      updatedList = updatedList.filter((item) => {
        return item.name1.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
      setpatients(updatedList);
    }

  };

  const filterBySearchdoc = (event) => {
    // Access input value

    const query = event.target.value;

    if (query === '') {

      setNum(randomNumberInRange(1, 10000000))
    }
    else {
      var updatedList = [...doctor];
      updatedList = updatedList.filter((item) => {
        return item.name1.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
      setdoctors(updatedList);
    }

  };


  const   filterBySearch_past = (event) => {
    // Access input value

    const query = event.target.value;

    if (query === '') {
      fetchinformation_pastrecord_doc(selected_user);
    }
    else {
      var updatedList = [...getallpastapppointdoc];
      updatedList = updatedList.filter((item) => {
        return item.p_name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
      fetallpastappointdoc(updatedList);
    }

  };

  
  const filterBySearch_curr = (event) => {
    // Access input value

    const query = event.target.value;

    if (query === '') {
      fetchinformation_currentrecord_doc(selected_user);
    }
    else {
      var updatedList = [...fetchcurrentdoc];
      updatedList = updatedList.filter((item) => {
        return item.p_name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
      fetch_curr_doc_appoint(updatedList);
    }

  };


  
  const   filterBySearch_past_pat = (event) => {
    // Access input value

    const query = event.target.value;
// alert(query);
    if (query === '') {
      fetchinformation_pastrecord_pat(selected_user);
    }
    else {
      var updatedList = [...getallapppointpatient_past];
      updatedList = updatedList.filter((item) => {
        return item.d_name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
      fetallappointpatient_past(updatedList);
    }

  };

  
  const filterBySearch_curr_pat = (event) => {
    // Access input value

    const query = event.target.value;

    if (query === '') {
      fetchinformation_currentrecord_pat(selected_user);
    }
    else {
      var updatedList = [...fetchcurrent_patient_current];
      updatedList = updatedList.filter((item) => {
        return item.d_name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
      fetch_curr_patient_appoint_current(updatedList);
    }

  };
  

  function show_doc(emailaddress) {
    setselected(emailaddress);
    fetchinformation_pastrecord_doc(emailaddress);
    fetchinformation_currentrecord_doc(emailaddress);


  }


  function show_pat(emailaddress) {
    setselected(emailaddress);
    fetchinformation_pastrecord_pat(emailaddress);
    fetchinformation_currentrecord_pat(emailaddress);


  }
  async function fetchinformation_pastrecord_doc(emailll) {

    try {
      // await delay(1000);
      var array1 = [{}];
      const baseURL = "http://localhost:5000/mysql/get_appointment_history_admin_doc/" + emailll;
      await axios.get(`${baseURL}`).then((response) => {
       
        for (var i = 0; i < response.data.length; i++) {
            array1[i] = response.data[i];


        }
        getallpastapppointdoc.length=0;
        fetallpastappointdoc(array1);
       setcheck1(false);
        setcheck(true);
      }).catch(error => {
        setError(error);
      });
    } catch (e) {
      console.error(e);
    }
  };

  async function fetchinformation_currentrecord_doc(emailll) {

    try {
      // await delay(1000);
      var array1 = [{}];
      const baseURL = "http://localhost:5000/mysql/get_appointment_current_admin_doc/" + emailll;
      await axios.get(`${baseURL}`).then((response) => {
    
        for (var i = 0; i < response.data.length; i++) {
            array1[i] = response.data[i];


        }
        fetchcurrentdoc.length=0;
        fetch_curr_doc_appoint(array1);
       
      }).catch(error => {
        setError(error);
      });
    } catch (e) {
      console.error(e);
    }



  };


  //==============================================================
  async function fetchinformation_pastrecord_pat(emailll) {

    try {
      // await delay(1000);
      var array1 = [{}];
      const baseURL = "http://localhost:5000/mysql/get_appointment_history_admin_pat/" + emailll;
      await axios.get(`${baseURL}`).then((response) => {
       
        for (var i = 0; i < response.data.length; i++) {
            array1[i] = response.data[i];


        }
        getallapppointpatient_past.length=0;
        fetallappointpatient_past(array1);
       setcheck(false);
        setcheck1(true);
      }).catch(error => {
        setError(error);
      });
    } catch (e) {
      console.error(e);
    }
  };

  async function fetchinformation_currentrecord_pat(emailll) {

    try {
      // await delay(1000);
      var array1 = [{}];
      const baseURL = "http://localhost:5000/mysql/get_appointment_current_admin_pat/" + emailll;
      await axios.get(`${baseURL}`).then((response) => {
        
        for (var i = 0; i < response.data.length; i++) {
            array1[i] = response.data[i];
        }
        fetchcurrent_patient_current.length=0;
        fetch_curr_patient_appoint_current(array1);
       
      }).catch(error => {
        setError(error);
      });
    } catch (e) {
      console.error(e);
    }



  };
  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{  backgroundColor: "#293148", minWidth: "200px", height: { sx: "auto", md: "93.5vh", lg: "93.5vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
        <Sidebaradmin />
      </Box>
      {/* HOMEPAGE STARTING */}
      <Box pl={"20px"} sx={{ overflowY: "auto", height: "93.5vh", flex: 1, backgroundColor: "#EEEEEE" }}>
        <Container disableGutters maxWidth >
          <Grid columnSpacing={{ lg: 0, sm: 1, md: 3, xs: 2 }} columnGap={{ lg: 2, md: 2, sm: 1, xs: 1 }} rowSpacing={4} container alignItems="center"
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
                    ADMIN Overview


                  </Typography>
                </CardContent>
              </Card>
            </Grid>




            <Grid justifyContent="center" alignItems="center" container item xs={12} sm={12} md={12} lg={12}>
              <Grid justifyContent="center" alignItems="center" item xs={12} sm={12} md={12} lg={6}>
                <Typography marginTop="20px" variant="h5" component="div">
                  Doctors List
                </Typography>
                <Card sx={{ minHeight: "400px", maxHeight: "200px", maxWidth: "600px", minHeight: "350px", overflow: "auto" }}>
                  <Grid sx={{ marginTop: "10px" }} container item lg={12} textAlign="center" justifyContent="center">
                    <input placeholder="Search Doctor" id="search-box" onChange={filterBySearchdoc} />
                  </Grid>

                  <CardContent>

                    {doctor.map((emaill) => (
                      <Grid>
                        <Grid container>
                          <Grid lg={6} >
                            <Typography textAlign="center" marginTop="10px" variant="body1" component="div">
                              {emaill.name1}
                            </Typography>
                            <Typography textAlign="center" sx={{ mb: 1.5 }} color="text.secondary">
                              {emaill.email}
                            </Typography>
                          </Grid>
                          <Grid lg={6}>
                            <CardActions sx={{ marginTop: "10px" }} >
                              <Button onClick={() => show_doc(emaill.email)} variant="outlined" size="small">View More</Button>
                            </CardActions>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                  </CardContent>

                </Card>
              </Grid>
              <Grid justifyContent="center" alignItems="center" item xs={12} sm={12} md={12} lg={6}>
                <Typography marginTop="20px" variant="h5" component="div">
                  Patients List
                </Typography>
                <Card sx={{ minHeight: "400px", maxHeight: "200px", maxWidth: "600px", minHeight: "350px", overflow: "auto" }}>
                  <Grid sx={{ marginTop: "10px" }} container lg={12} textAlign="center" justifyContent="center">
                    <input placeholder="Search Patient" id="search-box" onChange={filterBySearchpat} />
                  </Grid>
                  <CardContent>
                    {patietns.map((dat) => (
                      <Grid >
                        <Grid container >
                          <Grid lg={6} >
                            <Typography textAlign="center" marginTop="10px" variant="body1" component="div">
                              {dat.name1}
                            </Typography>
                            <Typography textAlign="center" sx={{ mb: 1.5 }} color="text.secondary">
                              {dat.email}
                            </Typography>
                          </Grid>
                          <Grid lg={6}>
                            <CardActions sx={{ marginTop: "10px" }} >
                              <Button onClick={() => show_pat(dat.email)} variant="outlined" size="small">View More</Button>
                            </CardActions>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>



            {/* ============================================== */}

            {check ? <React.Fragment>
              <Grid justifyContent="center" alignItems="center" container item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h5">Results From Search</Typography>
              </Grid>
              <Grid justifyContent="center" alignItems="center" container item xs={12} sm={12} md={12} lg={12}>
                <Grid justifyContent="center" alignItems="center" item xs={12} sm={12} md={12} lg={6}>
                  <Typography marginTop="20px" variant="h5" component="div">
                    Current Appointment Record
                  </Typography>
                  <Card sx={{ minHeight: "400px", maxHeight: "200px", maxWidth: "600px", minHeight: "350px", overflow: "auto" }}>
                    <Grid sx={{ marginTop: "10px" }} container item lg={12} textAlign="center" justifyContent="center">
                      <input placeholder="Search Doctor" id="search-box" onChange={filterBySearch_curr} />
                    </Grid>

                    <CardContent>
                      {fetchcurrentdoc.map((emaill) => (
                        <Grid sx={{ marginTop: "10px" }} container lg={12} textAlign="center" justifyContent="center" >
                          
                            <Grid lg={6} >
                              <Typography textAlign="center" marginTop="10px" variant="body1" component="div">
                                {emaill.p_name}
                              </Typography>
                              {emaill.appoint_status?<Typography textAlign="center" sx={{ mb: 1.5 }} color="text.secondary">
                                {" status "+ emaill.appoint_status}
                              </Typography>:""}
                            </Grid>
                          
                        </Grid>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>

                <Grid justifyContent="center" alignItems="center" item xs={12} sm={12} md={12} lg={6}>
                  <Typography marginTop="20px" variant="h5" component="div">
                    Past Appointments Record
                  </Typography>
                  <Card sx={{ minHeight: "400px", maxHeight: "200px", maxWidth: "600px", minHeight: "350px", overflow: "auto" }}>
                    <Grid sx={{ marginTop: "10px" }} container lg={12} textAlign="center" justifyContent="center">
                      <input placeholder="Search Patient" id="search-box" onChange={filterBySearch_past} />
                    </Grid>
                    <CardContent>
                      {getallpastapppointdoc.map((dat) => (
                        <Grid sx={{ marginTop: "10px" }} container lg={12} textAlign="center" justifyContent="center" >
                          
                            <Grid lg={6} >
                              <Typography textAlign="center" marginTop="10px" variant="body1" component="div">
                                {dat.p_name}
                              </Typography>
                              <Typography textAlign="center" sx={{ mb: 1.5 }} color="text.secondary">
                                {dat.Date1}
                              </Typography>
                        
                          </Grid>
                        </Grid>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid></React.Fragment> : ""}

              
            {check1 ? <React.Fragment>
              <Grid justifyContent="center" alignItems="center" container item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h5">Results From Search</Typography>
              </Grid>
              <Grid justifyContent="center" alignItems="center" container item xs={12} sm={12} md={12} lg={12}>
                <Grid justifyContent="center" alignItems="center" item xs={12} sm={12} md={12} lg={6}>
                  <Typography marginTop="20px" variant="h5" component="div">
                    Current Appointment Record
                  </Typography>
                  <Card sx={{ minHeight: "400px", maxHeight: "200px", maxWidth: "600px", minHeight: "350px", overflow: "auto" }}>
                    <Grid sx={{ marginTop: "10px" }} container item lg={12} textAlign="center" justifyContent="center">
                      <input placeholder="Search Doctor" id="search-box" onChange={filterBySearch_curr_pat} />
                    </Grid>

                    <CardContent>
                      {fetchcurrent_patient_current.map((emaill) => (
                        <Grid sx={{ marginTop: "10px" }} container lg={12} textAlign="center" justifyContent="center" >
                          
                            <Grid lg={6} >
                              <Typography textAlign="center" marginTop="10px" variant="body1" component="div">
                                {emaill.d_name}
                              </Typography>
                              {emaill.appoint_status?<Typography textAlign="center" sx={{ mb: 1.5 }} color="text.secondary">
                                {" status "+ emaill.appoint_status}
                              </Typography>:""}
                            </Grid>
                          
                        </Grid>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>

                <Grid justifyContent="center" alignItems="center" item xs={12} sm={12} md={12} lg={6}>
                  <Typography marginTop="20px" variant="h5" component="div">
                    Past Appointments Record
                  </Typography>
                  <Card sx={{ minHeight: "400px", maxHeight: "200px", maxWidth: "600px", minHeight: "350px", overflow: "auto" }}>
                    <Grid sx={{ marginTop: "10px" }} container lg={12} textAlign="center" justifyContent="center">
                      <input placeholder="Search Patient" id="search-box" onChange={filterBySearch_past_pat} />
                    </Grid>
                    <CardContent>
                      {getallapppointpatient_past.map((dat) => (
                        <Grid sx={{ marginTop: "10px" }} container lg={12} textAlign="center" justifyContent="center" >
                          
                            <Grid lg={6} >
                              <Typography textAlign="center" marginTop="10px" variant="body1" component="div">
                                {"Dr. "+dat.d_name}
                              </Typography>
                              <Typography textAlign="center" sx={{ mb: 1.5 }} color="text.secondary">
                                {dat.Date1}
                              </Typography>
                        
                          </Grid>
                        </Grid>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid></React.Fragment> : ""}
              <Patient_data />
          </Grid>
        </Container>
      </Box>
    </Stack>
  )
}


export default Adminhome;