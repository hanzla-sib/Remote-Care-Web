import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
function HeartbeatCard(){
  const [toggle, setToggle] = useState(false)
  const { curruser } = useContext(AuthContext);
  const [checktrue, settrue] = React.useState(false);
  const [post, setPost] = React.useState([{HR:0}]);
  const [error, setError] = React.useState({});
  

  React.useEffect(() => {
   
      setTimeout(() => {
        setToggle((prevToggle) => !prevToggle)
     async function fetchData() {
      try {
     
        // await delay(1000);
        const baseURL = "http://localhost:5000/mysql/getSteps/" + curruser.email;
        await axios.get(`${baseURL}`).then((response) => {
        
          setPost({HR:response.data[0].heartbeat});
          settrue(true);
        }).catch(error => {
          setError(error);
        });
      } catch (e) {
        console.error(e);
      }
     
    };
    fetchData();
      },
      10000);
     
  
  }, [toggle]);


    return(  <Card style={{ color: '#ffff', backgroundColor: '#00ACC1' }} sx={{  border: "0px solid black", borderRadius: "30px", boxShadow: 20 }}>
    <CardMedia
      component="img"
      height="250px"
      width="200px"
      image="https://media.istockphoto.com/vectors/heart-isometric-health-care-concept-red-shape-and-heartbeat-vector-id1183325543?k=20&m=1183325543&s=612x612&w=0&h=8AFG-3S4WTuK6RaCvGKtOy2ndQFDhwTrA36XbDoVOrQ="
      alt="heartbeat"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        heart beat
      </Typography>
      <Typography variant="h5">

       {post.HR}
      </Typography>
    </CardContent>
  </Card>)
}
export default HeartbeatCard;