import { Card, CardContent, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

function AppointmentsRequest({ setreloader }) {
  
  const [error, setError] = React.useState({});
  const { curruser } = useContext(AuthContext);
  const [getallapppoint, fetallappoint] = React.useState([]);


  React.useEffect(() => {
    async function fetchData() {
      try {
        var array1 = [];
        // await delay(1000);
        const baseURL = "http://localhost:5000/mysql/DoctorSideshowACCEPTEDAPPOINT/" + curruser.email;
        await axios.get(`${baseURL}`).then((response) => {
          // console.log(response.data);
          for (var i = 0; i < response.data.length; i++) {
            array1[i] = response.data[i];
          }
          fetallappoint(array1);

        }).catch(error => {

        });
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [setreloader]);


  return (



    <Card style={{ border: "none" }} sx={{ maxWidth: 600, minWidth: 500, maxHeight: 365, minHeight: 365, overflow: "auto", borderRadius: "30px", boxShadow: "20", backgroundColor: "#EEEEEE",marginBottom: "20px" ,marginTop:"10px" }}>
      <CardContent >
        <Typography display={"none"}>{setreloader}</Typography>
        <List sx={{ width: '100%', maxWidth: 560, bgcolor: '#EEEEEE', backgroundColor: "#EEEEEE", marginBottom: "10px" }}>
          {/* <Typography style={{ color: "black" }} align="center" variant="h6">Pending Appointments</Typography> */}
          {getallapppoint.map((value) => (
            <ListItem sx={{ backgroundColor: "lightsteelblue", border: "0px solid black", boxShadow: 3, borderRadius: "50px", marginBottom: "20px" }}  >

              <ListItemText style={{ color: "black", textAlign: "center" }} sx={{ border: "0px solid black", boxShadow: 3, borderRadius: "50px",margin:"10px" }}
                primary={value.p_name}
                secondary={
                  <React.Fragment>
                    <Typography style={{ color: "green" }}
                      sx={{ display: 'inline', justifyItems: "center" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                  Status : {value.appoint_status}

                    </Typography>
                    <Divider  color="green" sx={{ height: 3,width:"300px",marginLeft:"70px",marginTop:"5px" }} />
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

export default AppointmentsRequest;
