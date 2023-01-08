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

    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{ background: "linear-gradient(#304352, #3498db);", height: { sx: "auto", md: "93.5vh", lg: "93.5vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
        <Sidebar />
      </Box>
      <Box pl={"20px"} sx={{ overflowY: "auto", height: "93.5vh", flex: 2, backgroundColor: "#EEEEEE" }}>

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
      </Box>
    </Stack>
  );
}
export default Health_record;