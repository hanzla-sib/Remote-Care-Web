import { Button, Card, CardContent, CardMedia, Divider, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import React, { useContext } from "react";
import SimpleAreaChart from "../Chart";
import DoctorSidebar from "./DoctorSidebar";
import StaticTimePickerDemo from "../Time";
import { AuthContext } from "../../Context/AuthContext";
import AppointmentsRequest from "./AppointmentsRequests";
import RejectAppoint from "./Rejectorappoint";
import axios from "axios";
function DoctorHome(){
  const { curruser } = useContext(AuthContext);
  const [checktrue, settrue] = React.useState(false);
  const [post, setPost] = React.useState({});
  const [error, setError] = React.useState({});

  React.useEffect(() => {
    async function fetchData() {
      try {
        // await delay(1000);
        const baseURL = "http://localhost:5000/mysql/get_user_type/" + curruser.email;
        await axios.get(`${baseURL}`).then((response) => {
          setPost(response.data);
          settrue(true);

        }).catch(error => {
          setError(error);
        });
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

return(
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
    <Box sx={{ backgroundColor: "#293148", height: { sx: "auto", md: "93.5vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
      <DoctorSidebar />
    </Box>
    {/* HOMEPAGE STARTING */}
    <Box pl={"20px"} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Container>
        <Grid columnSpacing={{ lg: 0, sm: 1, md: 3, xs: 2 }} columnGap={{ lg: 1, md: 2, sm: 1, xs: 1 }} sx={{ margin: "auto" }} rowSpacing={4} container alignItems="center"
          justifyContent="center" direction={"row"} >

          <Grid marginRight={"20px"} maxWidth={"500px"} justifyContent="center" alignItems="center" container item sm={6} md={3} lg={3}>
            <Card style={{ border: "none", boxShadow: "none" }} sx={{ maxWidth: 400 }}>
              <CardContent sx={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                <Typography variant="h6" component="div">
                  Hi, Dr.  {checktrue == true ? post.name : "null"}
                </Typography>
                <Typography variant="body2" component="div">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid justifyContent="center" alignItems="center" item sm={12} md={6} lg={6}>
            <Container sx={{ border: "1px solid black", backgroundColor: "white" }} maxWidth={false} >
              <Typography variant="body2">Graph</Typography>
              <SimpleAreaChart />
            </Container>
          </Grid>

          {/* set appointmnets */}


{/* --------------------- */}
          <Grid justifyContent="center" alignItems="center" item sm={5} md={5} lg={5}>
            <RejectAppoint />
          </Grid>
{/* --------------------------- */}
          <Grid maxWidth={"500px"} justifyContent="center" alignItems="center" container item sm={5} md={5} lg={5}>
          <AppointmentsRequest />
          </Grid>

          {/* ----------- */}
       
        </Grid>
      </Container>
    </Box>
  </Stack>
)
}


export default DoctorHome;