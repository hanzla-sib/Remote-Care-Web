import { Button, Divider, List, ListItem, ListItemText, Typography, TextField, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Box, Stack } from "@mui/system";
import Sidebar from "./Sidebar";
import { Card, CardContent, CardMedia, Grid } from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext } from "react";
// import SimpleAreaChart from "../Chart"
import Caloriegraph from "./Caloriegraph";
import styled from "@emotion/styled";
import axios from "axios";
import { auth } from "../../Firebase/firebase-config"
import StaticTimePickerDemo from "../Time";
import SetAppoint from "./SetAppointments";
import Prescription from "./Prescription";
import Meal from "./Meal";
import { AuthContext } from "../../Context/AuthContext";
import Showappointmentsrec from "./Show_appointments_rec";





const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
// const delay = ms => new Promise(
//   resolve => setTimeout(resolve, ms)
// );


function Home() {
  const { curruser } = useContext(AuthContext);


  const [checktrue, settrue] = React.useState(false);
  const [post, setPost] = React.useState({});
  const [error, setError] = React.useState({});

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
      <Box sx={{ background: "linear-gradient(#16222A, #3A6073);", height: { sx: "auto", md: "93.5vh", lg: "93.5vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
        <Sidebar />
      </Box>
      {/* HOMEPAGE STARTING */}
      <Box pl={"20px"} sx={{ overflowY: "auto", height: "93.5vh", flex: 2, backgroundColor: "#EEEEEE" }}>
        <Container >
          <Grid columnSpacing={{ lg: 0, sm: 1, md: 3, xs: 2 }} columnGap={{ lg: 2, md: 2, sm: 1, xs: 1 }} sx={{ margin: "auto" }} rowSpacing={4} container alignItems="center"
            justifyContent="center" direction={"row"} >


            <Grid marginRight={"20px"} maxWidth={"500px"} justifyContent="left" alignItems="center" container item sm={12} md={12} lg={12}>

              {/* showing the Dashboard */}

              <Card style={{ color: '#4AA54E', backgroundColor: '#EEEEEE', fontWeight: "bold", border: "none", boxShadow: "none" }} sx={{ maxWidth: 400 }}>
                <CardContent sx={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                  <Typography variant="h4" component="div" >
                    Patient Overview


                  </Typography>

                </CardContent>
              </Card>
            </Grid>


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








            {/* showing Cards */}
            {/* Step Count Card */}
            <Grid justifyContent="center" alignItems="center" container item sm={5} md={3} lg={3}>
              <Card style={{ color: '#ffff', backgroundColor: '#E73E3B' }} sx={{ maxWidth: 180, border: "0px solid black", borderRadius: "30px", boxShadow: 20 }} elevation={2}>
                <CardMedia
                  component="img"
                  height="auto"
                  image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAeFBMVEX///8AAAD8/PwhISH09PQ4ODiysrLu7u6Xl5cGBga5ubnFxcUwMDD5+fno6OhkZGQpKSkaGhqOjo6fn59tbW2enp4PDw/e3t6Dg4PU1NR7e3utra1mZmZHR0ePj4/Dw8NSUlLW1tZcXFxBQUFMTEw0NDRzc3MXFxfvYD01AAAEx0lEQVR4nO2caXPiMAyG64QAoVDOJtznFv7/P1xa2mInskToTOTMvM/XNVMJW7fYlxcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADURKs3Hx6Hy3ZLW5C/sTim5kY6PGgL8zyttbFIz029lXxkXPq5tkhPkY9NkfFCW6gn6MQlPYy5NNBQ/hF6XO/kTVuuqnRJPYw5aQtWkU7mUcRstUWrxtKnh8ka9bha3gsxZq0tXBV8FvJJ2qQr+WAUMUtt6R4n5/Qwl0hbvoeZsIqYnrZ8D0MHw1+aY+6Mz/ok1pbvl3y6XM/mK5/74U3kShhZcDT99UmnFWm3K0mRVd0yU7w6VUZCpbNzSZF57VKXKTqkdFo+syaltxjWL3eBaFaWqls6JTgtYzYKorsQehjTLp5KJEU+NGS32ZJiZUUnVKzVS4xUpL/z6pErKfguqsh1UA4kLa+ABTMJXZGzV7DxwDkoKqL7tPLUL5l7JaKNJEoq3CA9FvkVs9XIJ6rut8NciDGv9tGNpIhqQOSqV2Nm9tGjpIhqjchHOccPcY/wi3ctJa68CbLZQVEoEAsPsWamFb5kMY3vqKkhZ7R2+erLAH4Yq2lxpS8IZ4cG6Rlqet+Idb5XMvu0cFjTaYlluPPuhdBeyvtrZCcqYg+jhIioaettUZGddXrInlRNGSXv674XvvugmqDIitgtHj6dIdoV9VFNEf606lhBDNaOIuxp3apKNvb2o6dn3j9SB1LW4XotVhHdoYIcEO04wj2tbOD9I3UwEBWx83jO2PdKGvxQXiwpYK/+cAWJdif+JOjhJI3+xpFJtXedpPLVaefu/eeOWgr8wAfrwtNnsl/NzPcLyf+erbMDfz1y0fVZV1qCInavcfGYvkoIta79ZA5H71g3gBU6ofvgShjtzqSd6DZ9bwj5b9mr5t1NyVZUM/hv+CQlIz/Tag+dQKpv6p+wUw//6GYxvzfnQxhLC4V4n/vk2/v+y/oD2dRijUSy4kFvFoeyTMP2Dx9ZHj2EcSH8IMpRZL7Szgx5uCaP/bSu2Uy6n2p24QSYzMMx9pvC6aYbylMqwTjgi3Xs3jA9BaqLfyvZGCvUOYlWMgljy8yBe1t3cUverT8P7jcKDxVMVOUyWgaQ9lowfmvye6hHH4hDMhcmJt5rcV9TKyRF/Ltxyb1C9CiivzVnQ/ZCs/27/W17npZ2P8slKoWSeNYrFBl0myIObCHe7SEmE8Kx0oakubVBcd8Ryo6+dIrqPPQDu5CfjuPovPNXrdRMV3P7hCY36WnLZx1ECzuAdlaJnZifl9sUSRBNh4fIt1YOUuxhN+ZXlId53wl4C7ef1ZDftS6Wt1TSHnw4OVncBD1ez/cI6dnh2ARc896IdjOnjTix/3HyHUziEJqkHFFvfSmYtDuL6mz3yebcCy4OOgza1NwghE57NSb09EN1U/EpPHNRuiEfMr5xorZc1fH0ILTFqg49qk61xarOgNznuMgfDA7ySthZT6BE1Kx6ry3VM1COK4wBYVWIfvZO/lSARKW1p3HYaZWXt2KHq0H/JYXLwc1+s+DLDi8H505Ca8BVoWM1sHSXef/M9DvEp810vRaD1XEUJ8sAx4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoMh/hZMyoukaivgAAAAASUVORK5CYII="
                  alt="Steps"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Step Counts
                  </Typography>
                  <Typography variant="body2" >
                    count
                  </Typography>
                </CardContent>
              </Card>

            </Grid>


            {/* Calorie Card */}
            <Grid justifyContent="center" alignItems="center" container item sm={5} md={3} lg={3}>
              <Card sx={{ maxWidth: 180, border: "0px solid black", borderRadius: "30px", boxShadow: 20 }}>
                <CardMedia
                  component="img"
                  height="auto"
                  image="https://is5-ssl.mzstatic.com/image/thumb/Purple128/v4/7c/66/ab/7c66ab1f-038c-7200-8de6-51afd6d47fa3/source/512x512bb.jpg"

                  alt="Calorie"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Calories
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    count
                  </Typography>
                </CardContent>
              </Card>

            </Grid>


            {/* Heart Beat Card */}
            <Grid justifyContent="center" alignItems="center" container item sm={12} md={3} lg={3}>
              <Card style={{ color: '#ffff', backgroundColor: '#00ACC1' }} sx={{ maxWidth: 180, border: "0px solid black", borderRadius: "30px", boxShadow: 20 }}>
                <CardMedia
                  component="img"
                  height="auto"
                  image="https://media.istockphoto.com/vectors/heart-isometric-health-care-concept-red-shape-and-heartbeat-vector-id1183325543?k=20&m=1183325543&s=612x612&w=0&h=8AFG-3S4WTuK6RaCvGKtOy2ndQFDhwTrA36XbDoVOrQ="
                  alt="heartbeat"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    heart beat
                  </Typography>
                  <Typography variant="body2">

                    count
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Add Meal funtionality */}

            <Grid item xs={12} container sm={12} md={6} lg={4} justifyContent={"center"} >
              <Meal />
            </Grid>


            {/* Add Prescription funtionality */}

            <Grid sx={{ marginTop: "40px" }} item xs={12} container sm={12} md={6} lg={6} justifyContent={"flex-end"} >
              <Prescription />
            </Grid>

            <Grid columnSpacing={{ lg: 0, sm: 1, md: 3, xs: 2 }} columnGap={{ lg: 2, md: 2, sm: 1, xs: 1 }} sx={{ margin: "auto" }} rowSpacing={4} container alignItems="center"
              justifyContent="center" direction={"row"} >

              {/* Graph of the Calories intake */}
              <Grid justifyContent="flex-start" alignItems="flex-start" item sm={12} md={6} lg={6} sx={{ borderRadius: "30px", boxShadow: 20, margin: "auto" }}>
                <Container sx={{ border: "1px  black", backgroundColor: "white" }} maxWidth={false} >
                  <Typography variant="h6">Calories intake</Typography>
                  <Caloriegraph />
                </Container>
              </Grid>


              {/* set appointmnets */}

              <Grid justifyContent="center" alignItems="center" item sm={5} md={5} lg={2}>
              <SetAppoint />
              </Grid>


              {/* Showing Appointments */}


              <Grid maxWidth={"500px"} justifyContent="center" alignItems="center" container item sm={5} md={5} lg={2}>
               <Showappointmentsrec />
              </Grid>


            </Grid>


          </Grid>


        </Container>
      </Box>
    </Stack>
  )
}

export default Home;