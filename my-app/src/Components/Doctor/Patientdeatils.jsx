import styled from "@emotion/styled";
import { Box, Button, ButtonBase, Card, CardContent, Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import SimpleAreaChart from "../Chart";
import DoctorSidebar from "./DoctorSidebar";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});
function Patientdeatils() {
    const [name, setname] = React.useState("");
    function handleChange(event) {
        setname(event.target.value);
    }
    const [HD2, setHD2] = React.useState("");
    function handleChange2(event) {
        setHD2(event.target.value);
    }
    const [HD3, setHD3] = React.useState("");
    function handleChange3(event) {
        setHD3(event.target.value);
    }
    const [HD4, setHD4] = React.useState("");
    function handleChange4(event) {
        setHD4(event.target.value);
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

                        <Grid maxWidth={"200px"} justifyContent="flex-start" alignItems="center" container item sm={6} md={3} lg={12}>
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

                        <Grid container item xs={12} sm={12} md={6} lg={12} >
                            <ButtonBase sx={{ width: "50%", height: 128, justifyContent: "flex-start", alignItems: "flex-start" }}>
                                <Img alt="complex" src="https://img.freepik.com/premium-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg?w=2000" />
                            </ButtonBase>
                        </Grid>
                        {/*  */}
                        <Grid margin={"40px 0px"} container justifyContent="flex-start" alignItems="center" item sm={2} md={3} lg={3}>
                            <Card style={{ border: "none", boxShadow: "none" }} sx={{ maxWidth: 400 }}>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        Steps
                                    </Typography>

                                </CardContent>

                            </Card>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Patient</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={HD2}
                                    label="Age"
                                    onChange={handleChange2}
                                >
                                    <MenuItem value={10}>Daily</MenuItem>
                                    <MenuItem value={20}>Weekly</MenuItem>
                                    <MenuItem value={30}>Monthly</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid margin={"40px 0px"} container justifyContent="flex-start" alignItems="center" item sm={9} md={6} lg={6}>
                            <Container sx={{ border: "1px solid black", backgroundColor: "white" }} maxWidth={false} >
                                <Typography variant="body2">Graph</Typography>
                                <SimpleAreaChart />
                            </Container>
                        </Grid>
                        {/*  */}

                        {/*  */}

                        <Grid margin={"40px 0px"} container justifyContent="flex-start" alignItems="center" item sm={2} md={3} lg={3}>
                            <Card style={{ border: "none", boxShadow: "none" }} sx={{ maxWidth: 400 }}>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        HeartBeat
                                    </Typography>
                                </CardContent>
                            </Card>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Patient</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={HD3}
                                    label="Age"
                                    onChange={handleChange3}
                                >
                                    <MenuItem value={10}>Daily</MenuItem>
                                    <MenuItem value={20}>Weekly</MenuItem>
                                    <MenuItem value={30}>Monthly</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid margin={"40px 0px"} container justifyContent="flex-start" alignItems="center" item sm={9} md={6} lg={6}>
                            <Container sx={{ border: "1px solid black", backgroundColor: "white" }} maxWidth={false} >
                                <Typography variant="body2">Graph</Typography>
                                <SimpleAreaChart />
                            </Container>
                        </Grid>


                        {/*  */}

                        {/*  */}
                        <Grid container justifyContent="flex-start" alignItems="center" item sm={2} md={3} lg={3}>
                            <Card style={{ border: "none", boxShadow: "none" }} sx={{ maxWidth: 400 }}>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        Haemoglobin
                                    </Typography>
                                </CardContent>
                            </Card>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Patient</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={HD4}
                                    label="Age"
                                    onChange={handleChange4}
                                >
                                    <MenuItem value={10}>Daily</MenuItem>
                                    <MenuItem value={20}>Weekly</MenuItem>
                                    <MenuItem value={30}>Monthly</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid container justifyContent="flex-start" alignItems="center" item sm={9} md={6} lg={6}>
                            <Container sx={{ border: "1px solid black", backgroundColor: "white" }} maxWidth={false} >
                                <Typography variant="body2">Graph</Typography>
                                <SimpleAreaChart />
                            </Container>
                        </Grid>
                        {/*  */}
                        <Grid container justifyContent="flex-end" alignItems="flex-end" item sm={9} md={6} lg={6} direction="column">
                            <Typography variant="body1">Add Perscription</Typography>
                            <TextField
                                id="outlined-multiline-static"
                                label="Multiline"
                                multiline
                                rows={2}
                            />
                        <Button sx={{marginTop:"4px"}} variant="contained">ADD</Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Stack>
    )
}

export default Patientdeatils;
