import { Button, Card, CardContent, Divider, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { textAlign } from "@mui/system";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { makeStyles, styled } from '@mui/material/styles';

const Hover_style = styled(List)({
  // hover states
  '& .MuiListItemButton-root:hover': {
    backgroundColor: 'lightgrey',
    '&, & .MuiListItemIcon-root': {
      color: 'green',
    },
  },
});


function Tests() {
  const { curruser } = useContext(AuthContext);
  const [error, setError] = React.useState({});
  const [post, setPost] = React.useState([]);
  const [getallapppoint, fetallappoint] = React.useState([{}]);
  React.useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      // var array1 = [{img:"",det:""}];

      // await delay(1000);
      const baseURL = "http://localhost:5000/mysql/get_test_record/" + curruser.email;

      post.length = 0;
      await axios.get(`${baseURL}`).then((response) => {
        // console.log("ssssss");
        // console.log(response.data);
        for (var i = 0; i < response.data.length; i++) {

          post.push({ img: response.data[i].image_link, det: response.data[i].details });
        }
        // setPost(array1);
      }).catch(error => {
        setError(error);
      });
    } catch (e) {
      console.error(e);
    }
  };


  function openme(link) {
    var win = window.open(link, '_blank');
    win.focus();

  }


  return (
    <Card style={{ border: "none" }} sx={{ maxWidth: 400, maxHeight: 365, minHeight: 365, overflow: "auto", borderRadius: "30px", boxShadow: "10", backgroundColor: "#EEEEEE", marginBottom: "20px", marginTop: "10px" }}>
      {/* <Typography variant="body2" textAlign="center">click to open</Typography> */}
      <CardContent >
      <Hover_style>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#EEEEEE', backgroundColor: "#EEEEEE", marginBottom: "10px" }}>
          {/* <Typography style={{ color: "white" }} variant="h6">TEST RECORDS</Typography> */}
          {post.map((value) => (
            
            <ListItemButton onClick={() => openme(value.img)} sx={{ backgroundColor: "lightsteelblue", border: "0px solid black", boxShadow: 8, borderRadius: "50px", marginBottom: "20px" }}   >

              <ListItemText style={{ color: "black", textAlign: "center" }} sx={{ border: "0px solid black", boxShadow: 5, borderRadius: "20px", margin: "10px" }}
                primary=<Typography variant="h6">{value.det}</Typography>

              />
            </ListItemButton>
          ))}
        </List>
        </Hover_style>

      </CardContent>
    </Card>
  )

}

export default Tests;