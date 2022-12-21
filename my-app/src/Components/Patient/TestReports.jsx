import { Avatar, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";


import { auth } from "../../Firebase/firebase-config";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";


// const delay = ms => new Promise(
//   resolve => setTimeout(resolve, ms)
// );

function Tests() {
  const { curruser } = useContext(AuthContext);
  const [post, setPost] = React.useState([]);
  const [error, setError] = React.useState([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      var array1 = [];
      // await delay(1000);
      const baseURL = "http://localhost:5000/mysql/get_test_record/" + curruser.email;
      // console.log("===================", auth.currentUser.email)
      // console.log("data    ", auth.currentUser);
      await axios.get(`${baseURL}`).then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          array1[i] = response.data[i].imageurl;
       
        }
       setPost(array1);
      }).catch(error => {
        setError(error);
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (

    <Box style={{ maxHeight: '50vh', overflow: 'auto' }}>

      <Typography variant="h5" align="center">TEST RECORDS</Typography>
      {post.map((value) => (
        <Card sx={{ maxWidth: 800 }}>

          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                R
              </Avatar>
            }

            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          <CardMedia
            component="img"
            height="194"
            image={`http://192.168.182.116/smd_project/${value}`}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels,
              if you like.
            </Typography>
          </CardContent>
        </Card>


      ))}

    </Box>

  )
}

export default Tests;