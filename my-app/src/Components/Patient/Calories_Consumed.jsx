import styled from "@emotion/styled"; // Importing the styled component utility from "@emotion/styled"
import { Box, Button, ButtonBase, Card, CardContent, CardMedia, Container, Grid, Paper, Stack, TextField, Typography } from "@mui/material"; // Importing multiple components from the "@mui/material" library
import axios from "axios"; // Importing the axios library for making HTTP requests
import React, { useContext } from "react"; // Importing React and the useContext hook
import react from "react"; // Importing React (not required since it's already imported above)
import { AuthContext } from "../../Context/AuthContext"; // Importing the AuthContext from a specific file location
import { auth } from "../../Firebase/firebase-config"; // Importing the auth object from a specific file location
import SimpleAreaChart from "../Chart"; // Importing the SimpleAreaChart component from a specific file location
import Monthly_calories_Consumed from "./monthly_graphs/Monthly_caloriesConsumed"; // Importing the Monthly_calories_Consumed component from a specific file location
import Sidebar from "./Sidebar"; // Importing the Sidebar component from a specific file location
import Weekly_calories_con from "./weekly_graphs/Weekly_calories_consumed"; // Importing the Weekly_calories_con component from a specific file location

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
  const { curruser } = useContext(AuthContext); // Accessing the curruser value from the AuthContext using the useContext hook
  const [checktrue, settrue] = React.useState(false); // Creating a state variable checktrue and a function settrue to update it
  const [post, setPost] = React.useState({}); // Creating a state variable post and a function setPost to update it
  const [call, setCall] = React.useState([]); // Creating a state variable call and a function setCall to update it
  const [error, setError] = React.useState({}); // Creating a state variable error and a function setError to update it

  React.useEffect(() => {

    async function fetchData() {
      try {
        // await delay(1000);
        call.push({ name: "2022-12-21", uv: 1000 }); // Adding data to the call array
        const baseURL = "http://localhost:5000/Usersfunctions/read/" + curruser.email; // Setting the baseURL for the HTTP request

        await axios.get(`${baseURL}`).then((response) => {
          setPost(response.data); // Updating the post state variable with the response data
          settrue(true); // Updating the checktrue state variable to true
        }).catch((error) => {
          setError(error); // Setting the error state variable if the request fails
        });

      } catch (e) {
        console.error(e);
      }
    };
    fetchData(); // Calling the fetchData function when the component mounts
  }, []);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>

      <Box pl={"20px"} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Container>
          <Grid columnSpacing={{ lg: 0, sm: 1, md: 3, xs: 2 }} columnGap={{ lg: 1, md: 2, sm: 1, xs: 1 }} sx={{ margin: "auto" }} rowSpacing={4} container alignItems="center" justifyContent="center" direction={"row"}>
            <Grid maxWidth={"500px"} justifyContent="flex-start" alignItems="center" container item sm={6} md={3} lg={12}>
              <Card style={{ border: "none", boxShadow: "none" }} sx={{ maxWidth: 400 }}>
                <CardContent sx={{ background: "#EEEEEE" }}>
                  <Typography variant="h4" component="div" color={"#4AA54E"}>
                    Hi, MR {checktrue == true ? post.Name : "null"} {/* Displaying the name based on the checktrue and post values */}
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
            {/* Rendering the Weekly_calories_con component */}
            {/*  */}
            {/*  */}
            <Monthly_calories_Consumed />
            {/* Rendering the Monthly_calories_Consumed component */}
            {/*  */}
          </Grid>
        </Container>
      </Box>
    </Stack>
  )
}

export default CaloriesConsumed;
