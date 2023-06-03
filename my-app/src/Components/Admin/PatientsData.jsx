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
import Weekly_Hr_ADmin from './Weekly_Report_Patient/Weekly_Hr_admin';
import Monthly_HR_admin from './Monthly_Report_patients/Monthly_Hr_admin';

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
        <Grid container justifyContent="center" alignItems="center" item xs={12} sm={12} md={12} lg={12}>
            <Grid marginTop="30px" marginBottom="30px" >
                <Box maxWidth="700px" textAlign="center" sx={{ minWidth: 620 }} >
                    <Typography variant="h6" margin={"10px"}>Select the Patient</Typography>
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
                <Grid xs={12} sm={12} md={12} lg={12}>
                    <Typography marginLeft="80px" variant='overline' textAlign="center" fontSize="30px">Monthly</Typography>
                </Grid>
                <Monthly_Calories_consumed name={patient} />
                <Monthly_calories_Burnt name={patient} />
                <Monthly_HR_admin name={patient} />
                <Monthly_Steps name={patient} />
                <Grid xs={12} sm={12} md={12} lg={12}>
                    <Typography marginLeft="80px" variant='overline' justifyContent="center" fontSize="30px" textAlign="center">Weekly</Typography>
                </Grid>
                <Calorie_Burnt name={patient} />
                <Calorie_consumed name={patient} />
                <Weekly_Hr_ADmin name={patient} />
                <Steps_graph name={patient} />

            </Grid> : ""}

        </Grid>


    );
}
export default Patient_data;