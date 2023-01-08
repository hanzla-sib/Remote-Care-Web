import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import styled from "@emotion/styled";
import { Button, ButtonBase, Grid, Paper, TextField } from "@mui/material";
import { Container } from "@mui/system";
import Meal from "./Meal";
import Tests from "./TestReports";
import axios from "axios";
import { auth } from "../../Firebase/firebase-config"
import { AuthContext } from "../../Context/AuthContext";




const Img = styled('img')({


  maxWidth: '100%',
 
  Height: '20%',
  
 
});

// const delay = ms => new Promise(
//   resolve => setTimeout(resolve, ms)
// );


function Profile() {


  const [checktrue, settrue] = React.useState(false);
  const [post, setPost] = React.useState("user");
  const [name, setname] = React.useState("user");
  const [email, setemail] = React.useState("user");
  const [error, setError] = React.useState({});
  const { curruser } = useContext(AuthContext);
  console.log("====================");
  console.log(curruser.email);

  React.useEffect(() => {
    async function fetchData() {
      try {
        // await delay(1000);
        const baseURL = "http://localhost:5000/mysql/get_user_type/" + curruser.email;

        await axios.get(`${baseURL}`).then((response) => {
          console.log(response.data.imageurl);
          setPost(response.data.imageurl);
          setname(response.data.name);
          setemail(response.data.email);
         
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
      <Box  sx={{ overflowY: "auto", height: "93.5vh", flex: 2,marginTop:"20px" }}>
        <Container maxWidth={false}  >
          {/* <Paper
            sx={{
              margin: 'auto',
              marginTop: "55px",
              marginBottom: "40px",
              borderRadius: "30px",
              maxWidth: 200,
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
          >
            <Grid>
                <Img alt="complex" src={'http://localhost/smd_project/'+post} />
              <Grid item xs={12} textAlign="center" direction={"column"}>
                <Typography gutterBottom variant="h5" component="div">
                  Hi, MR {checktrue == true ? name : "null"}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {checktrue == true ? email : "null"}
                </Typography>
              </Grid>
            </Grid>
          </Paper> */}

          <Grid container justifyContent={"flex-start"} alignItems="center" spacing={2} direction={"column"} sx={{ boxShadow: 20, borderRadius: "30px" }}>
          <h3>TEST RECORDS</h3>
            <Grid item xs={12} container sm={12} md={6} lg={12} justifyContent={"flex-start"} >
              <Tests />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Stack>
  )
}

export default Profile;