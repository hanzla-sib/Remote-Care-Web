import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { NavLink } from "react-router-dom";

function DoctorSidebar(){
    const logout = async () => {
        localStorage.clear();
        window.location.reload();
      }
    return( 
         
        <Stack direction="row"
            sx={{
                overflowY: "auto",
                height: { sx: "auto", md: "95%" },
                flexDirection: { md: "column" },
                alignItems: "center"
            }}>

            <NavLink  style={{ textDecoration: "none", color: "white" }} to="/DoctorHome"><span> <button
                className="category-btn">Home </button></span></NavLink>


          


            
           

        <Button onClick={logout}>logout</Button>

        </Stack>
    )
}


export default DoctorSidebar;