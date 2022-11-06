import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import Sidebar from "./Sidebar";
import styled from "@emotion/styled";
import { Button, ButtonBase, Grid, Paper, TextField } from "@mui/material";
import { Container } from "@mui/system";
import Meal from "./Meal";
import Tests from "./TestReports";
import axios from "axios";
import { auth } from "../../Firebase/firebase-config"



// const Img = styled('img')({
//   margin: 'auto',
//   display: 'block',
//   maxWidth: '100%',
//   maxHeight: '100%',
// });
const Img = styled('img')({
  
  
  maxWidth: '100%',
  maxHeight: '100%',
 borderRadius: "50%"
});

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);


function Profile() {

  
  const [checktrue,settrue]=React.useState(false);
  const [post, setPost] = React.useState({});
  const [error, setError] = React.useState({});
 
  React.useEffect(() => {
    async function fetchData() {
      try {
    await delay(1000);
    const baseURL = "http://localhost:5000/Usersfunctions/read/"+auth.currentUser.email;
    console.log("===================",auth.currentUser.email)
    console.log("data    ",auth.currentUser);
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
      <Box pl={"20px"} sx={{ overflowY: "auto", height: "93.5vh", flex: 2 }}>
        <Container maxWidth={false}  >
          <Paper
            sx={{
              p: 2,
              margin: 'auto',
              marginTop: "55px",
              marginBottom:"40px",
              borderRadius:"30px",
              boxShadow: "20",
              maxWidth: 500,
              flexGrow: 1,
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6} >
                <ButtonBase sx={{ width: "100%", height: 128 }}>
                  <Img alt="complex" src={post.Dp} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container justifyContent={"center"} direction={"column"}>
                <Typography gutterBottom variant="h5" component="div">
                Hi, MR {checktrue == true? post.Name: "null"}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                {checktrue == true? post.Email: "null"}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Grid container justifyContent={"center"} alignItems="center" spacing={2} direction={"row"} sx={{boxShadow:20, borderRadius:"30px",}}>
           <Grid item xs={12} container sm={12} md={6} lg={6} justifyContent={"center"} >
              
            <Paper
              sx={{
                border: "none", boxShadow: "20",
                p: 2,
                margin: 'auto',
                marginTop: "10px",
                marginBottom:"40px",
                borderRadius:"30px",
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor:"black"
              }}
            >
              <Grid container justifyContent={"center"} alignItems="center" spacing={2} direction={"column"} sx={{backgroundColor:"black", borderRadius:"30px",}}>
                <Grid item xs={12} sm container justifyContent={"flex-start"}>
                  <Typography variant="h5" style={{color:"white"}}>Update Profile: </Typography>
                </Grid>
                <Grid item xs={12} sm container justifyContent={"flex-end"}>
                  <TextField sx={{ width: "70%", input: { color: 'white' } }} id="outlined-basic" label="Change Name" variant="outlined" focused/>
                </Grid>

                <Grid item xs={12} sm container justifyContent={"flex-end"}>
                  <TextField sx={{ width: "70%", input: { color: 'white' } }} id="outlined-basic" label="Change Email" variant="outlined" focused />
                </Grid>
                <Grid item xs={12} sm container justifyContent={"flex-end"}>
                  <TextField sx={{ width: "70%", input: { color: 'white' } }} id="outlined-basic" label="enter old password" variant="outlined" focused/>
                </Grid>
                <Grid item xs={12} sm container justifyContent={"flex-end"}>
                  <TextField sx={{ width: "70%", input: { color: 'white' } }} id="outlined-basic" label="enter new password" variant="outlined" focused />
                </Grid>
                <Grid item xs={12} sm container justifyContent={"flex-end"}>
                  <Button variant="contained" sx={{ background: "#545CD8" }}>Save</Button>
                </Grid>

              </Grid>
            </Paper>
            </Grid>
            <Grid item xs={12} container sm={12} md={6} lg={2} justifyContent={"center"} >
                <Tests />
             </Grid>
          </Grid>
          
          



        </Container>
      </Box>
    </Stack>
  )
}

export default Profile;