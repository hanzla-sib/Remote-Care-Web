import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import Sidebar from "./Sidebar";
import { Accordion, AccordionDetails, AccordionSummary, ButtonBase, Grid, Paper } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container } from "@mui/system";
import styled from "@emotion/styled";
import {auth} from "../../Firebase/firebase-config"
import axios from "axios";


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
function Prescription() {

  

  return (

          <Paper sx={{
            marginTop: "100px",
            boxShadow: "20",
            p: 1,
            maxWidth: "400",
            flexGrow: 1,
            margin: 'auto',
            borderRadius:"30px",
            marginBottom: "50px",
            background: "linear-gradient(to right,#000000, #434343);",
            overflow: "auto"
          }}>
            <Grid container justifyContent={"center"}>
              <Accordion sx={{background: "linear-gradient(to right,#000000, #434343);", maxWidth: "80%" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography color={"white"}>Prescription 1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color={"white"}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{background: "linear-gradient(to right,#000000, #434343)", maxWidth: "80%" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography color={"white"}>Prescription 2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color={"white"}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{background: "linear-gradient(to right,#000000, #434343)", maxWidth: "80%" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography color={"white"}>Prescription 3</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color={"white"}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{background: "linear-gradient(to right,#000000, #434343)", maxWidth: "80%" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography color={"white"}>Prescription 4</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color={"white"}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{background: "linear-gradient(to right,#000000, #434343)", maxWidth: "80%" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography color={"white"}>Prescription 5</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color={"white"}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Paper>

  )
}

export default Prescription;