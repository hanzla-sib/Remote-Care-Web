import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import SimpleAreaChart from "../../Chart";
import Rangechart from "../../Rangechart";

function HR_range({ dat }) {
    // Accessing the current user from AuthContext
    const { curruser } = useContext(AuthContext);

    // Setting up state variables
    const [post, setPost] = React.useState([]);
    const [error, setError] = React.useState({});

    // Fetching data from the server
    React.useEffect(() => {
        async function fetchData() {
            try {
                // Constructing the API URL with the current user's email and date range
                const baseURL =
                    "http://localhost:5000/mysql/getheartbeat_weekly_range/" +
                    curruser.email +
                    "/" +
                    dat.dat1 +
                    "/" +
                    dat.dat2;

                // Making a GET request to the server using axios
                await axios
                    .get(`${baseURL}`)
                    .then((response) => {
                        console.log(response.data);

                        // Clearing the post array
                        post.length = 0;
                        var countdig = 0;

                        // Extracting necessary data from the response and populating the post array
                        for (var i = countdig; i < response.data.length; i++) {
                            let date_val = response.data[i].date_log;
                            let smalldate = "";
                            smalldate += date_val[5];
                            smalldate += date_val[6];
                            smalldate += date_val[7];
                            smalldate += date_val[8];
                            smalldate += date_val[9];
                            post.push({ name: smalldate, uv: response.data[i].HR });
                        }
                    })
                    .catch((error) => {
                        setError(error);
                    });
            } catch (e) {
                console.error(e);
            }
        }

        fetchData();
    }, [dat]);

    return (
        <React.Fragment>
            <Grid justifyContent="flex-start" alignItems="flex-start" item sm={12} md={6} lg={5} sx={{ borderRadius: "30px", boxShadow: 20, marginBottom: "30px" }}>
                <Container sx={{ border: "1px  black", backgroundColor: "white" }} maxWidth={false} >
                    <Typography variant="h6">HEART RATE</Typography>
                    <Rangechart arr={post} />
                </Container>
            </Grid>
        </React.Fragment>)

}

export default HR_range