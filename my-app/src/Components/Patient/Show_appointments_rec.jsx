import { Card, CardContent, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

function Show_appointments_rec() {
    const { curruser } = useContext(AuthContext);
    const [error, setError] = React.useState({});
    const [getallapppoint, fetallappoint] = React.useState([{}]);
    React.useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            // await delay(1000);
            var array1 = [{}];
            const baseURL = "http://localhost:5000/mysql/get_pending_and_confirmed_appoint/" + curruser.email;
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
        <Card style={{ border: "none" }} sx={{ minWidth: 150, maxWidth: 400, minHeight: 200, borderRadius: "30px", boxShadow: "20", backgroundColor: "black", marginBottom: "20px" }}>
            <CardContent >

                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', backgroundColor: "black" }}>
                    <Typography style={{ color: "white" }} variant="h6">Appointments</Typography>
                    {getallapppoint.map((value) => (
                    <ListItem alignItems="flex-start" >

                        <ListItemText style={{ color: "#1e90ff" }}
                            primary={value.d_name}
                            secondary={
                                <React.Fragment>
                                    <Typography style={{ color: "#1e90ff" }}
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {value.appoint_status}
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

export default Show_appointments_rec;