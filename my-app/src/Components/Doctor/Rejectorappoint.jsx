import { Button, Card, CardContent, List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
function RejectAppoint(){
    const { curruser } = useContext(AuthContext);
    const [getallapppoint, fetallappoint] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
          try {
            var array1 = [];
            // await delay(1000);
            const baseURL = "http://localhost:5000/mysql/DoctorPendingAppoint/" + curruser.email;
            await axios.get(`${baseURL}`).then((response) => {
                // console.log(response.data.length);

                for (var i = 0; i < response.data.length; i++) {
                    array1[i] = response.data[i];
                }
                fetallappoint(array1);
                if(getallapppoint.length===1){
                    // fetallappoint();
                }
            }).catch(error => {
              
            });
          } catch (e) {
            console.error(e);
          }
        };
        fetchData();
      }, []);


      const AcceptReq = async (p_email) => {
       
        
        try {
            // setfullevent({eventname:getevent,time:gettime,email:returned_state_object.email});
            
            const objec={
                pat_email:p_email,
                doc_email:curruser.email
            }
            const resp = await axios.post('http://localhost:5000/mysql/AcceptAppointment',objec);
            alert(resp.data);
        } catch (err) {
            console.error(err);
        }
    };


    const RejectReq = async (p_email) => {

        
        try { 
            const objec={
                pat_email:p_email,
                doc_email:curruser.email
            }
            const resp = await axios.post('http://localhost:5000/mysql/RejectAppointment',objec);
            alert(resp.data);
        } catch (err) {
            console.error(err);
        }
    };
    return(
        <Card style={{ border: "none", boxShadow: "none" }} sx={{ maxWidth: 400 }}>
              <CardContent>
                <Typography variant="h6" marginLeft={"40px"} >
                Appointment Requests
                </Typography>
                <List >
                {getallapppoint.map((value)=>(
                    
                    <ListItem  >
                   
                    <ListItemText sx={{marginLeft:"60px"}}>{value.p_name}</ListItemText>
                    <Button onClick={(e) => AcceptReq(value.p_email)}  sx={{marginRight:"10px"}} variant="contained">Accept</Button>
                    <Button onClick={(e) => RejectReq(value.p_email)} variant="contained">Reject</Button>
                  </ListItem>
                ))}
                 
                </List>
              </CardContent>
            </Card>
    )
}
export default RejectAppoint;