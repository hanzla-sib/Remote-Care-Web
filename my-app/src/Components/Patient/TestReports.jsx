import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import react from "react";
import SimpleAreaChart from "../Chart";
import Sidebar from "./Sidebar";
import {auth} from "../../Firebase/firebase-config";
import axios from "axios";
import React from "react";
function Tests() {

  const [getheight, setheight] = react.useState(false);
  var heightvalue = 140;
  var widthvalue = 345;
  var direction = "column";
  function handleclick() {
    setheight(!getheight);
  }

  if (getheight === false) {
    heightvalue = 140;
    widthvalue = 345;
  }
  else if (getheight === true) {
    heightvalue = 500;
    widthvalue = 700;

  }


  const baseURL = "http://localhost:5000/Usersfunctions/read/"+auth.currentUser.email;
  console.log("===================",auth.currentUser.email)
  console.log("data    ",auth.currentUser);
  const [post, setPost] = React.useState({});
  const [error, setError] = React.useState({});

  React.useEffect(() => {
    
    async function fetchData() {
      try {
    await axios.get(`${baseURL}`).then((response) => {
      setPost(response.data);
    }).catch(error => {
      setError(error);
    });
        
      } catch (e) {
          console.error(e);
          
      }
  };
  fetchData();
  }, []);

  return (<Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>

    <Box pl={"20px"} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Container>
        <Grid columnSpacing={{ lg: 0, sm: 1, md: 3, xs: 2 }} columnGap={{ lg: 1, md: 2, sm: 1, xs: 1 }} sx={{ margin: "auto" }} rowSpacing={4} container alignItems="center"
          justifyContent="flex-start" direction={"column"} >


          {/*  */}
          <Grid maxWidth={"500px"} justifyContent="center" alignItems="flex-start" container item sm={12} md={12} lg={12} direction="row">
            <Grid  container item sm={12} md={12} lg={4} >

              <Button style={{minWidth:"60px"}} variant="contained" sx={{marginRight:"4px",  fontSize: "8px" }}>Select Image</Button>

            </Grid>
            <Grid  container item sm={12} md={12} lg={4} >

              <Button style={{minWidth:"60px"}} variant="contained" sx={{  fontSize: "8px" }}>Add Detail</Button>
             

            </Grid>
           

          </Grid>
          <Grid maxWidth={"500px"} justifyContent="flex-start" alignItems="flex-start" container item sm={12} md={12} lg={12} direction="row">
            <Card sx={{ maxWidth: { widthvalue } }}>
              <CardActionArea onClick={handleclick}>
                <CardMedia
                  component="img"
                  height={heightvalue}
                  image="https://images.twinkl.co.uk/tw1n/image/private/t_630/u/ux/screenshot-4_ver_1.png"
                  alt="green iguana"
                />
              </CardActionArea>
            </Card>
            <Card sx={{ minWidth: 200, marginLeft: "20px", border: "none", boxShadow: "none" }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Deatils
                </Typography>
                <Typography variant="h5" component="div">
                  ........
                </Typography>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Container>
    </Box>
  </Stack>)
}

export default Tests;