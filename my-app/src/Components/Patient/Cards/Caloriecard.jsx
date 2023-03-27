import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

function CalorieCard({setreloader}){
  const { curruser } = useContext(AuthContext);
  const [checktrue, settrue] = React.useState(false);
  const [post, setPost] = React.useState("null");
  const [error, setError] = React.useState({});
  

  React.useEffect(() => {
    async function fetchData() {
      try {
        // await delay(1000);
        const baseURL = "http://localhost:5000/mysql/getCaloriegraph/" + curruser.email;
        await axios.get(`${baseURL}`).then((response) => {
        
          setPost(response.data[response.data.length-1].Calories);
          settrue(true);
        }).catch(error => {
          setError(error);
        });
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [setreloader]);
    return(
        <Card Card  sx={{  border: "0px solid black", borderRadius: "30px", boxShadow: 20 }}>
       
        <CardMedia
          component="img"
          height="250px"
      width="200px"
          image="https://is5-ssl.mzstatic.com/image/thumb/Purple128/v4/7c/66/ab/7c66ab1f-038c-7200-8de6-51afd6d47fa3/source/512x512bb.jpg"
          alt="Calorie"
        />
        <CardContent>
        <Typography display={"none"} gutterBottom variant="h5" component="div">
        {setreloader}
          </Typography>
        
          <Typography gutterBottom variant="h5" component="div" sx={{textAlign:"center"}}>
            Calories Intake
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{textAlign:"center"}}>
            {checktrue?post:"0"}
          </Typography>
        </CardContent>
        
      </Card>
    )
}

export default CalorieCard;