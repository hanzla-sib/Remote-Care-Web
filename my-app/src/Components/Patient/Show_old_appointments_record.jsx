import { Card, CardContent, Divider, List, ListItem, ListItemText,Typography } from "@mui/material";
import { textAlign } from "@mui/system";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";


function Show_old_appointment({setreloderappoint}) {
    const { curruser } = useContext(AuthContext);
    const [error, setError] = React.useState({});
    const [getallapppoint, fetallappoint] = React.useState([{}]);
    React.useEffect(() => {
        fetchData();
    }, [setreloderappoint]);

    async function fetchData() {
        try {
            // await delay(1000);
            var array1 = [{}];
            const baseURL = "http://localhost:5000/mysql/get_appointment_history/" + curruser.email;
            await axios.get(`${baseURL}`).then((response) => {
                // console.log(response.data);
                for (var i = 0; i < response.data.length; i++) {
                    array1[i] = response.data[i];
                   

                }
                fetallappoint(array1);
                // console.log("array1");
                // console.log(array1);

            }).catch(error => {
                setError(error);
            });
        } catch (e) {
            console.error(e);
        }
    };


    return (
        <Card style={{ border: "none" }} sx={{  maxWidth: 400,maxHeight:365,minHeight:365, overflow:"auto", borderRadius: "30px", boxShadow: "10", backgroundColor: "#EEEEEE", marginBottom: "20px" ,marginTop:"10px"}}>
            <CardContent >
            <Typography display={"none"}>{setreloderappoint}</Typography>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#EEEEEE', backgroundColor: "#EEEEEE" ,marginBottom: "5px"}}>
                    {/* <Typography style={{ color: "white" }} variant="h6">Appointment History</Typography> */}
                    {getallapppoint.map((value) => (
                       
                         <ListItem sx={{ backgroundColor: "lightsteelblue" ,border: "0px solid black", boxShadow: 8, borderRadius: "50px",marginBottom: "20px"}}  >

                            <ListItemText  style={{  color: "black", textAlign:"center" }} sx={{ border: "0px solid black", boxShadow: 5, borderRadius: "20px",margin:"10px"}}
                               
                                primary=<Typography sx={{fontSize:"18px"}} variant="subtitle1">{"DR. "+value.d_name}</Typography>
                                secondary={
                                    <React.Fragment>
                                      
                                        <Typography  style={{ color: "green" }}
                                            sx={{ display: 'inline', justifyItems:"center" }}
                                            component="span"
                                            variant="body1"
                                            color="text.primary"
                                        >
                                            {value.Date1 ?  " Appointment done : " + value.Date1 + " ": ""}
                                        </Typography>
                                        
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

export default Show_old_appointment;