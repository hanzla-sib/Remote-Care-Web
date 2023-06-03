import * as React from 'react'; // Import the React library and its dependencies
import PropTypes from 'prop-types'; // Import the PropTypes library
import Tabs from '@mui/material/Tabs'; // Import the Tabs component from Material-UI
import Tab from '@mui/material/Tab'; // Import the Tab component from Material-UI
import { Typography, Box, Stack, Grid, Container, Card, CardContent } from '@mui/material'; // Import various components from Material-UI
import Sidebar from "./Sidebar"; // Import the Sidebar component from a local file

import CaloriesBurned from './CaloriesBurned'; // Import the CaloriesBurned component from a local file
import HeartBeat from './HeartBeat'; // Import the HeartBeat component from a local file

import { AuthContext } from '../../Context/AuthContext'; // Import the AuthContext from a local file
import axios from 'axios'; // Import the axios library for making HTTP requests
import Steps_Monthly from './monthly_graphs/Monthly_steps'; // Import the Steps_Monthly component from a local file
import Monthly_calories_Consumed from './monthly_graphs/Monthly_caloriesConsumed'; // Import the Monthly_calories_Consumed component from a local file
import Monthly_calories_Burnt from './monthly_graphs/Monthly_Calories_Burnt'; // Import the Monthly_calories_Burnt component from a local file
import HR_Monthly from './monthly_graphs/Monthly_heartbeat'; // Import the HR_Monthly component from a local file

function Health_record() {
  const [value, setValue] = React.useState(0); // Declare and initialize a state variable 'value' using the useState hook
  const [reloder, setreloader] = React.useState(0); // Declare and initialize a state variable 'reloder' using the useState hook
  const { curruser } = React.useContext(AuthContext); // Access the 'curruser' variable from the AuthContext using the useContext hook
  const [checktrue, settrue] = React.useState(false); // Declare and initialize a state variable 'checktrue' using the useState hook
  const [error, setError] = React.useState({}); // Declare and initialize a state variable 'error' using the useState hook
  const [post, setPost] = React.useState({}); // Declare and initialize a state variable 'post' using the useState hook
  const handleChange = (event, newValue) => { // Define a function 'handleChange' that updates the 'value' state variable
    setValue(newValue);
  };

  React.useEffect(() => { // Use the useEffect hook to perform side effects
    async function fetchData() {
      try {
        // await delay(1000);
        const baseURL = "http://localhost:5000/mysql/get_user_type/" + curruser.email; // Define a base URL for an API request
        await axios.get(`${baseURL}`).then((response) => { // Make a GET request using axios and handle the response
          setPost(response.data); // Update the 'post' state variable with the response data
          settrue(true); // Set 'checktrue' to true
        }).catch(error => {
          setError(error); // Handle any errors that occur during the API request
        });
      } catch (e) {
        console.error(e); // Log any errors that occur
      }
    };
    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  return (




    <Grid columnSpacing={{ lg: 0, sm: 1, md: 3, xs: 2 }} columnGap={{ lg: 2, md: 2, sm: 1, xs: 1 }} sx={{ margin: "auto" }} rowSpacing={4} container alignItems="center"
      justifyContent="center" direction={"row"} >

      {/* Graph of the Calories intake */}
      <Monthly_calories_Consumed />

      {/* Graph of the Calories burned */}
      <Monthly_calories_Burnt />

      {/* Graph of the Heart beat */}
      <HR_Monthly />

      {/* Graph of the steps */}
      <Steps_Monthly />
    </Grid>


  );
}
export default Health_record;