import styled from "@emotion/styled"; // Import the styled function from Emotion library
import { Box, Button, ButtonBase, Card, CardContent, CardMedia, Container, Grid, Paper, Stack, TextField, Typography } from "@mui/material"; // Import various components from Material-UI
import axios from "axios"; // Import the axios library for making HTTP requests
import React, { useContext } from "react"; // Import React and its dependencies
import { AuthContext } from "../../Context/AuthContext"; // Import the AuthContext from a local file
import { auth } from "../../Firebase/firebase-config"; // Import the 'auth' object from a local file
import SimpleAreaChart from "../Chart"; // Import the SimpleAreaChart component from a local file
import Sidebar from "./Sidebar"; // Import the Sidebar component from a local file

// const delay = ms => new Promise(
//   resolve => setTimeout(resolve, ms)
// );

const Img = styled('img')({ // Define a styled component called Img using Emotion
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

function HeartBeat() {
  const { curruser } = useContext(AuthContext); // Access the 'curruser' variable from the AuthContext using the useContext hook
  const [checktrue, settrue] = React.useState(false); // Declare and initialize a state variable 'checktrue' using the useState hook
  const [post, setPost] = React.useState({}); // Declare and initialize a state variable 'post' using the useState hook
  const [call, setCall] = React.useState([]); // Declare and initialize a state variable 'call' as an empty array using the useState hook
  const [error, setError] = React.useState({}); // Declare and initialize a state variable 'error' using the useState hook

  React.useEffect(() => { // Use the useEffect hook to perform side effects
    async function fetchData() {
      try {
        call.push({ name: "2022-12-21", uv: 1000 }); // Add data to the 'call' array
        call.push({ name: "2022-12-21", uv: 2000 });
        call.push({ name: "2022-12-21", uv: 5000 });
        call.push({ name: "2022-12-21", uv: 4000 });
        call.push({ name: "2022-12-21", uv: 1000 });
        call.push({ name: "2022-12-21", uv: 3500 });
        call.push({ name: "2022-12-21", uv: 6600 });

        // await delay(1000);
        const baseURL = "http://localhost:5000/Usersfunctions/read/" + curruser.email; // Define a base URL for an API request
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
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>

      <Box pl={"20px"} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Container>
          <Grid columnSpacing={{ lg: 0, sm: 1, md: 3, xs: 2 }} columnGap={{ lg: 1, md: 2, sm: 1, xs: 1 }} sx={{ margin: "auto" }} rowSpacing={4} container alignItems="center"
            justifyContent="center" direction={"row"} >

            <Grid maxWidth={"500px"} justifyContent="flex-start" alignItems="center" container item sm={6} md={3} lg={12}>
              <Card style={{ border: "none", boxShadow: "none" }} sx={{ maxWidth: 400 }}>
                <CardContent sx={{ background: "#EEEEEE" }}>
                  <Typography variant="h4" component="div" color={"#4AA54E"}>
                    Hi, MR {checktrue == true ? post.Name : "null"}
                  </Typography>
                  <Typography variant="h6" component="div">
                    Heart Beat Record.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/*  */}
            <Grid margin={"40px 0px"} container justifyContent="flex-start" alignItems="center" item sm={6} md={3} lg={3}>
              <Card style={{ border: "none", boxShadow: "none" }} sx={{ maxWidth: 400 }}>
                <CardContent sx={{ background: "#EEEEEE" }}>
                  <Typography variant="h6" component="div">
                    DAILY
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid margin={"40px 0px"} container justifyContent="flex-start" alignItems="center" item sm={12} md={6} lg={6}>
              <Container sx={{ border: "1px solid black", backgroundColor: "white" }} maxWidth={false} >
                <Typography variant="body2">Graph</Typography>
                <SimpleAreaChart arr={call} />
              </Container>
            </Grid>
            {/*  */}

            {/*  */}

            <Grid margin={"40px 0px"} container justifyContent="flex-start" alignItems="center" item sm={6} md={3} lg={3}>
              <Card style={{ border: "none", boxShadow: "none" }} sx={{ maxWidth: 400 }}>
                <CardContent sx={{ background: "#EEEEEE" }}>
                  <Typography variant="h6" component="div">
                    Weekly
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid margin={"40px 0px"} container justifyContent="flex-start" alignItems="center" item sm={12} md={6} lg={6}>
              <Container sx={{ border: "1px solid black", backgroundColor: "white" }} maxWidth={false} >
                <Typography variant="body2">Graph</Typography>
                <SimpleAreaChart arr={call} />
              </Container>
            </Grid>


            {/*  */}

            {/*  */}
            <Grid container justifyContent="flex-start" alignItems="center" item sm={6} md={3} lg={3}>
              <Card style={{ border: "none", boxShadow: "none" }} sx={{ maxWidth: 400 }}>
                <CardContent sx={{ background: "#EEEEEE" }}>
                  <Typography variant="h6" component="div">
                    Monthly
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid container justifyContent="flex-start" alignItems="center" item sm={12} md={6} lg={6}>
              <Container sx={{ border: "1px solid black", backgroundColor: "white" }} maxWidth={false} >
                <Typography variant="body2">Graph</Typography>
                <SimpleAreaChart arr={call} />
              </Container>
            </Grid>
            {/*  */}

          </Grid>
        </Container>
      </Box>
    </Stack>
  )
}

export default HeartBeat;
