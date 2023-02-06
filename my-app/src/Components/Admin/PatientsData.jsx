import * as React from 'react';

import { Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';


import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import Monthly_Steps from "./Monthly_Report_patients/Monthly_steps_Admin";
import Monthly_calories_Burnt from "./Monthly_Report_patients/Monthly_Calories_Burnt_admin";
import Monthly_Calories_consumed from "./Monthly_Report_patients/Monthly_caloriesConsumed_Admin";
import Sidebaradmin from './SidebarAdmin';
import { Box, Stack } from '@mui/system';

import Calorie_Burnt from "./Weekly_Report_Patient/CalorieBurnt_graph_admin";
import Calorie_consumed from "./Weekly_Report_Patient/CalorieConsumed_graph_admin";
import Steps_graph from "./Weekly_Report_Patient/Steps_weekly_admin";



function Patient_data() {
    
  const [num, setNum] = React.useState(0);

  function randomNumberInRange(min, max) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
    const [check, setcheck] = React.useState(false);
    const [patient, setPatient] = React.useState('');
    const [pats, setpats] = React.useState([]);
    const handleChange = (event) => {
        setcheck(true);
        setPatient(event.target.value);
        setNum(randomNumberInRange(1, 10000));
    };
    React.useEffect(() => {

        async function fetchData() {
            var array1 = [];
            try {

                const baseURL = "http://localhost:5000/mysql/get_all_patients";
                await axios.get(`${baseURL}`).then((response) => {
                    console.log("ADMINPATIETNDATA");
                    console.log(response.data);

                    for (var i = 0; i < response.data.length; i++) {

                        array1[i] = response.data[i].email;
                    }
                    setpats(array1);
                }).catch(error => {
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
                <Sidebaradmin />
            </Box>
            <Box pl={"20px"} sx={{ overflowY: "auto", height: "93.5vh", flex: 1, backgroundColor: "#EEEEEE" }}>

                <Container disableGutters maxWidth >
                    <Grid>
                        <Grid marginTop="30px" marginBottom="30px">
                            <Box maxWidth="200px" textAlign="center">
                                <Typography>Select the Patient</Typography>
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
                        
                        {check ? <Grid columnSpacing={{ lg: 0, sm: 1, md: 3, xs: 2 }} columnGap={{ lg: 2, md: 2, sm: 1, xs: 1 }} sx={{ margin: "auto" }} rowSpacing={4} container alignItems="center"
                            justifyContent="center" direction={"row"} >
                           <Grid container item xs={12} sm={12} md={12} lg={12}>
                            <Typography textAlign="center">Monthly</Typography>
                           </Grid>
                            <Monthly_Calories_consumed name={patient} />
                            <Monthly_calories_Burnt name={patient} />
                            <Monthly_calories_Burnt name={patient} />
                            <Monthly_Steps name={patient} />
                            <Grid container item xs={12} sm={12} md={12} lg={12}>
                            <Typography textAlign="center">Weekly</Typography>
                           </Grid>
                           <Calorie_Burnt name={patient} />
                            <Calorie_consumed name={patient} />
                            <Calorie_consumed name={patient} />
                            <Steps_graph name={patient} />

                        </Grid> : ""}

                    </Grid>
                </Container>
            </Box>







        </Stack>


    );
}
export default Patient_data;