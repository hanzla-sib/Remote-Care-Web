import styled from "@emotion/styled";
import { Box, Button, ButtonBase, Card, CardContent, Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React from "react";


import DoctorSidebar from "./DoctorSidebar";


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});
function DoctorPrescription() {
    const [name, setname] = React.useState("");
    function handleChange(event) {
        setname(event.target.value);
    }

    return (
        <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
            <Box sx={{ backgroundColor: "#293148", height: { sx: "auto", md: "93.5vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
                <DoctorSidebar />

            </Box>
            <Box pl={"20px"} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
                <Container>
                    <Grid columnSpacing={{ lg: 0, sm: 1, md: 3, xs: 2 }} columnGap={{ lg: 1, md: 2, sm: 1, xs: 1 }} sx={{ margin: "auto" }} rowSpacing={4} container alignItems="center"
                        justifyContent="center" direction={"row"} >

                        <Grid maxWidth={"200px"} justifyContent="flex-start" alignItems="center" container item sm={6} md={12} lg={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Patient</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={name}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>HANZLA</MenuItem>
                                    <MenuItem value={20}>UMAID</MenuItem>
                                    <MenuItem value={30}>WAQAS</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid container item xs={12} sm={12} md={6} lg={3} >
                            <ButtonBase sx={{ width: "50%", height: 128, justifyContent: "flex-start", alignItems: "flex-start" }}>
                                <Img alt="complex" src="https://img.freepik.com/premium-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg?w=2000" />
                            </ButtonBase>
                        </Grid>
                        {/*  */}
                        <Grid margin={"40px 0px"} container justifyContent="flex-start" alignItems="center" item sm={12} md={12} lg={7} direction={"column"}>
                            <Grid  container justifyContent={"center"} alignItems={"center"}  item sm={2} md={12} lg={3} direction={"row"}>
                                <Card  sx={{ maxWidth: 400,margin:"20px" }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            You Prescribed This
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card sx={{ maxWidth: 400,margin:"20px" }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                           Date
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid  container justifyContent={"center"} alignItems={"center"} item sm={2} md={6} lg={3} direction={"row"}>
                                <Card  sx={{ maxWidth: 400,margin:"20px" }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            You Prescribed This
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card  sx={{ maxWidth: 400,margin:"20px" }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                        Date
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid  container justifyContent={"center"} alignItems={"center"} item sm={2} md={6} lg={3} direction={"row"}>
                                <Card  sx={{ maxWidth: 400,margin:"20px" }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            You Prescribed This
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card  sx={{ maxWidth: 400 ,margin:"20px"}}>
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                        Date
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                        </Grid>

                    </Grid>
                </Container>
            </Box>
        </Stack>
    )
}

export default DoctorPrescription;
