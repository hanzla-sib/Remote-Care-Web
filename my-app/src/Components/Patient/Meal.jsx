import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import Sidebar from "./Sidebar";
import styled from "@emotion/styled";
import { Button, ButtonBase, Grid, Paper, TextField } from "@mui/material";
import { Container } from "@mui/system";
import StaticTimePickerDemo from "../Time";
import { auth } from "../../Firebase/firebase-config";
import axios from "axios";

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
function Meal() {
  // const [checktrue,settrue]=React.useState(false);
  // const [post, setPost] = React.useState({});
  // const [error, setError] = React.useState({});

  // React.useEffect(() => {
    
  //   async function fetchData() {
  //     try {
  //       await delay(10000);
  //       const baseURL = "http://localhost:5000/Usersfunctions/read/"+auth.currentUser.email;
  // console.log("===================",auth.currentUser.email)
  // console.log("data    ",auth.currentUser);
  //   await axios.get(`${baseURL}`).then((response) => {
  //     setPost(response.data);
  //   }).catch(error => {
  //     setError(error);
  //   });
        
  //     } catch (e) {
  //         console.error(e);
          
  //     }
  // };
  // fetchData();
  // }, []);

  
const[nameoffood,setnameofffod]=React.useState("");

const submitbutton = async () => {
  try {
    
      const studentObject = {
          Namefood: nameoffood,  
          Email:auth.currentUser.email
      };
      axios.post('http://localhost:5000/Usersfunctions/queryfood', studentObject)
          .then(res => console.log(res.data));
          alert("meal added");
  }
  catch (error) {
      alert("error");
  }

}


  return (


          <Paper elevation={24}
            sx={{
              border: "none", 
              boxShadow: "20",
              p: 2,
              height: "230px",
              margin: 'auto',
              maxWidth: 400,
              borderRadius:"30px" ,
              flexGrow: 1,
              background: "linear-gradient(to right,#4b6cb7, #182848);"
                
            }}
          >
            <Grid container spacing={2} direction={"column"}>
              <Grid item xs={12} sm container justifyContent={"flex-start"}>
                <Typography variant="h5">ADD MEAL </Typography>
              </Grid>
              {/* <Grid item xs={12} sm container justifyContent={"flex-start"}>
                <StaticTimePickerDemo />
              </Grid> */}

              <Grid item xs={12} sm container justifyContent={"flex-start"}>
              <TextField  sx={{ width: "70%",background:"#ffff" }} id="outlined-basic" value={nameoffood} onChange={(e)=>{setnameofffod(e.target.value)}} label="ADD MEAL" variant="outlined" />
              </Grid>

              <Grid item xs={12} sm container justifyContent={"flex-start"}>
                <Button onClick={submitbutton} variant="contained" sx={{ background: "#545CD8" }}>Save</Button>
              </Grid>

            </Grid>
          </Paper>

  )
}

export default Meal;