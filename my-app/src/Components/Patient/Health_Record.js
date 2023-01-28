import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Typography, Box, Stack, Grid, Container, Card, CardContent } from '@mui/material';
import Sidebar from "./Sidebar";
import Steps from './Steps';
import CaloriesBurned from './CaloriesBurned';
import HeartBeat from './HeartBeat';

import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import Steps_Monthly from './monthly_graphs/Monthly_steps';
import Monthly_calories_Consumed from './monthly_graphs/Monthly_caloriesConsumed';
import Monthly_calories_Burnt from './monthly_graphs/Monthly_Calories_Burnt';



function Health_record() {
  const [value, setValue] = React.useState(0);
  const [reloder, setreloader] = React.useState(0);
  const { curruser } = React.useContext(AuthContext);
  const [checktrue, settrue] = React.useState(false);
  const [error, setError] = React.useState({});
  const [post, setPost] = React.useState({});
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
  }, []);

  return (

   
     
      
        <Grid columnSpacing={{ lg: 0, sm: 1, md: 3, xs: 2 }} columnGap={{ lg: 2, md: 2, sm: 1, xs: 1 }} sx={{ margin: "auto" }} rowSpacing={4} container alignItems="center"
          justifyContent="center" direction={"row"} >
        
          {/* Graph of the Calories intake */}
         <Monthly_calories_Consumed />

          {/* Graph of the Calories burned */}
          <Monthly_calories_Burnt />

          {/* Graph of the Heart beat */}
          <Monthly_calories_Burnt />

          {/* Graph of the steps */}
          <Steps_Monthly />
        </Grid>
     
   
  );
}
export default Health_record;