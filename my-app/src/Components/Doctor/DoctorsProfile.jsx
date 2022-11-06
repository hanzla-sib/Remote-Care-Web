import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import DoctorSidebar from "./DoctorSidebar";
import styled from "@emotion/styled";
import { Button, ButtonBase, Grid, Paper, TextField } from "@mui/material";
import { Container } from "@mui/system";


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
function DoctorProfile() {
  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{ backgroundColor: "#293148", height: { sx: "auto", md: "93.5vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
        <DoctorSidebar />

      </Box>
      <Box pl={"20px"} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Container maxWidth={false}  >
          <Paper
            sx={{
              p: 2,
              margin: 'auto',
              marginTop: "55px",
              maxWidth: 500,
              flexGrow: 1,
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6} >
                <ButtonBase sx={{ width: "100%", height: 128 }}>
                  <Img alt="complex" src="https://img.freepik.com/premium-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg?w=2000" />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container justifyContent={"center"} direction={"column"}>
                <Typography gutterBottom variant="h5" component="div">
                  Name
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Email
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          <Paper
            sx={{
              border: "none", boxShadow: "none",
              p: 2,
              margin: 'auto',
              marginTop: "10px",
              maxWidth: 500,
              flexGrow: 1,
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
          >
            <Grid container spacing={2} direction={"column"}>
              <Grid item xs={12} sm container justifyContent={"flex-start"}>
                <Typography variant="h5">Update Profile: </Typography>
              </Grid>
              <Grid item xs={12} sm container justifyContent={"flex-end"}>
                <TextField sx={{ width: "70%" }} id="outlined-basic" label="Change Name" variant="outlined" />
              </Grid>

              <Grid item xs={12} sm container justifyContent={"flex-end"}>
                <TextField sx={{ width: "70%" }} id="outlined-basic" label="Change Email" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm container justifyContent={"flex-end"}>
                <TextField sx={{ width: "70%" }} id="outlined-basic" label="enter old password" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm container justifyContent={"flex-end"}>
                <TextField sx={{ width: "70%" }} id="outlined-basic" label="enter new password" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm container justifyContent={"flex-end"}>
                <Button variant="contained" sx={{ background: "#545CD8" }}>Save</Button>
              </Grid>

            </Grid>
          </Paper>



        </Container>
      </Box>
    </Stack>
  )
}

export default DoctorProfile;