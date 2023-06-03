import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import SimpleAreaChart from "../../Chart";

function Monthly_calories_Consumed_Admin({ name }) {
    const { curruser } = useContext(AuthContext);
    const [checktrue, settrue] = React.useState(false);
    const [post, setPost] = React.useState([]);
    const [error, setError] = React.useState({});


    React.useEffect(() => {

        async function fetchData() {
            try {
                // await delay(1000);
                const baseURL = "http://localhost:5000/mysql/getCaloriesConsumedgraph_Monthly/" + name;
                await axios.get(`${baseURL}`).then((response) => {

                    post.length = 0;
                    var countdig = 0;


                    for (var i = countdig; i < response.data.length; i++) {

                        post.push({ name: response.data[i].month, uv: response.data[i].totalConsumedCalories });

                    }

                }).catch(error => {
                    setError(error);
                });
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [name]);
    return (
        <React.Fragment>
            <Grid justifyContent="flex-start" alignItems="flex-start" item sm={12} md={6} lg={5} sx={{ borderRadius: "30px", boxShadow: 20, marginBottom: "10px" }}>
                <Container sx={{ border: "1px  black", backgroundColor: "white", borderRadius: "30px", boxShadow: 20, marginBottom: "10px" }} maxWidth={false} >
                    <Typography variant="h6">Calories intake</Typography>
                    <SimpleAreaChart arr={post} />
                </Container>
            </Grid>
        </React.Fragment>)
}

export default Monthly_calories_Consumed_Admin;