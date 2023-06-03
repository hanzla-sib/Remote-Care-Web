import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { NavLink } from "react-router-dom";

// Define a custom styled component using emotion
const ColorButton = styled(Button)(({ theme }) => ({
    '&:hover': {
        background: "#3F51B6",
    }
}));

function Sidebar() {
    // Function to handle logout
    const logout = async () => {
        localStorage.clear(); // Clear local storage
        window.location.reload(); // Reload the window
    };

    return (
        <Stack
            direction="row"
            sx={{
                overflowY: "auto",
                height: { sx: "auto", md: "95%" },
                flexDirection: { md: "column" },
                alignItems: "center"
            }}
        >
            {/* Navigation link to "/homepat" */}
            <NavLink style={{ textDecoration: "none", color: "white" }} to="/homepat">
                <span>
                    {" "}
                    <button className="category-btn">Home</button>
                </span>
            </NavLink>

            {/* Button for logout */}
            <Button onClick={logout}>logout</Button>
        </Stack>
    );
}

export default Sidebar;
