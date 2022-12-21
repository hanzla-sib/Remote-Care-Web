import { Button, Card, CardContent, List, ListItem, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);
function SetAppoint() {
    const { curruser } = useContext(AuthContext);
    const [error, setError] = React.useState({});
    const [getdoctors, fetchdoctors] = React.useState([]);
    React.useEffect(() => {
        fetchData();
    }, []);


    async function fetchData() {
        try {
            // await delay(1000);
            var array1 = [];
            const baseURL = "http://localhost:5000/mysql/get_all_docs_in_patient_appoint/" + curruser.email;
            await axios.get(`${baseURL}`).then((response) => {
                // console.log(response.data);
                fetchDataafterlimit(response.data);
            }).catch(error => {
                setError(error);
            });
        } catch (e) {
            console.error(e);
        }
    };

    async function fetchDataafterlimit(params) {

        try {
            // await delay(1000);

            var array1 = [];
            const data1= {
                email: curruser.email,
                dataarray: params
            }
            const baseURL = "http://localhost:5000/mysql/get_limited_doctors_in_patient_appoint";
            const resp = await axios.post('http://localhost:5000/mysql/get_limited_doctors_in_patient_appoint',data1);
            // console.log(resp.data);
            for (var i = 0; i < resp.data.length; i++) {
                array1[i] = resp.data[i];
            }
            console.log(array1);
            fetchdoctors(array1);
        } catch (e) {
            console.error(e);
        }
    
    };

    const requestApooint = async (docname) => {
        try { 
            const objec={
                pat_email:curruser.email,
                doc_name:docname
            }
            const resp = await axios.post('http://localhost:5000/mysql/RequestAppoint',objec);
            alert(resp.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Card style={{ border: "none" }} sx={{ minWidth: 150, maxWidth: 400, minHeight: 200, borderRadius: "30px", boxShadow: 20, backgroundColor: "black" }} >
            <CardContent>
                <Typography style={{ color: "white" }} variant="h6" marginLeft={"25px"} >
                    Set Appointments
                </Typography>
                <List >
                    {getdoctors.map((value) => (
                        <ListItem sx={{ justifyContent: "center", alignItems: "center" }} >
                            <Button  onClick={(e) => requestApooint(value)} style={{ maxWidth: '200px', maxHeight: '50px', minWidth: '100px', minHeight: '40px' }} variant="contained">{value}</Button>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    )
}

export default SetAppoint;