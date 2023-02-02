import { Button, Card, CardContent, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { textAlign } from "@mui/system";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";


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

      for (var j = 0; j < post.length; j++) {
        post.pop();
      }
      await axios.get(`${baseURL}`).then((response) => {
        console.log("ssssss");
        console.log(response.data);
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




  return (
    <Card style={{ border: "none" }} sx={{ maxWidth: 300, maxHeight: 365, minHeight: 365, overflow: "auto", borderRadius: "30px", boxShadow: "20", backgroundColor: "black", marginBottom: "20px", marginTop: "10px" }}>
      <CardContent >

        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', backgroundColor: "black", marginBottom: "10px" }}>
          {/* <Typography style={{ color: "white" }} variant="h6">TEST RECORDS</Typography> */}
          {post.map((value) => (
            <ListItem sx={{ backgroundColor: "white", border: "0px solid black", boxShadow: 3, borderRadius: "50px", marginBottom: "10px" }}  >

              <ListItemText style={{ color: "black", textAlign: "center" }} sx={{ border: "0px solid black", boxShadow: 3, borderRadius: "50px" }}
                primary={value.det}
                secondary={
                  <React.Fragment>
                    <Typography style={{ color: "green" }}
                      sx={{ display: 'inline', justifyItems: "center" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      <a href={value.img} target="_blank">
                      <Button variant="contained">open</Button>
                      </a>

                    </Typography>
                    <Divider color="#FDA228" sx={{ height: 3 }} />
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}

        </List>
      </CardContent>
    </Card>
  )

}

export default Tests;