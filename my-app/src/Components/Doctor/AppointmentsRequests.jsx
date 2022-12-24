import { Card, CardContent, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

function AppointmentsRequest({setreloader}){
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

    return(  <Card style={{ border: "none", boxShadow: "none" }} sx={{ maxWidth: 400 }}>
    <CardContent >
      
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <Typography variant="h6">Appointments</Typography>
        <Typography display={"none"} >{setreloader}</Typography>
        {getallapppoint.map((value) => (
            <ListItem alignItems="flex-start">
          <ListItemText
            primary={value.p_name}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                 {"Date  : "+value.Date1+"   Time   : "+value.Time1}
                </Typography>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            }
          />
        </ListItem>
        
           ))}
           
     
      
        
        
      </List>
    </CardContent>
  </Card>)
}

export default AppointmentsRequest;
