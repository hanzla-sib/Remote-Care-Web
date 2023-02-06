import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { NavLink } from "react-router-dom";

const ColorButton = styled(Button)(({ theme }) => ({

    '&:hover': {
        background: "#3F51B6",
    }
}));
function Sidebaradmin() {
    const logout = async () => {
        localStorage.clear();
        window.location.reload();
      }
    return (
        <Stack direction="row"
            sx={{
               
                overflowY: "auto",
                height: { sx: "auto", md: "95%" },
                flexDirection: { md: "column" },
                alignItems: "center"
            }}>

            <NavLink  style={{ textDecoration: "none", color: "white" }} to="/ADMIN"><span> <button
                className="category-btn">Home</button></span></NavLink>
          {/* <NavLink  style={{ textDecoration: "none" }} to="/patienthistoryadmin"><span> <button
                className="category-btn">PatientHistory</button></span></NavLink> */}


        <Button onClick={logout}>logout</Button>

        </Stack>
    )
}

export default Sidebaradmin;