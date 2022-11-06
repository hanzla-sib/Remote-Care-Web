import { Stack } from "@mui/system";
import React from "react";
import { NavLink } from "react-router-dom";

function DoctorSidebar(){
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


            <span>
                <NavLink style={{ textDecoration: "none", color: "white" }} to="/Dprofile"><button
                    className="category-btn">Profile</button></NavLink>
            </span>


            <NavLink style={{ textDecoration: "none", color: "white" }} to="/Dpatientdeatils">
                <span><button
                    className="category-btn">Patient details </button></span>
            </NavLink>
            <NavLink style={{ textDecoration: "none", color: "white" }} to="/Dprescription"> <button
                className="category-btn">Prescription deatils  </button></NavLink>

           

        </Stack>
    )
}


export default DoctorSidebar;