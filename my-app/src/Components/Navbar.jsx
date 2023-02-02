import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import styled from "@emotion/styled";


const Styledbar = styled(Toolbar)({
    justifyContent: "space-between",
});

function Navbar() {
    const logout = async () => {
        localStorage.clear();
        window.location.reload();
      }
    return (
        <AppBar p={2} sx={{ position: "sticky", backgroundColor: "#293148" }}>
            <Styledbar variant="dense" >
                <Typography variant="h6" sx={{ marginLeft: "24px" }}>REMCARE</Typography> 
                <Button variant="contained" onClick={logout}>logout</Button>
            </Styledbar>
        </AppBar>

    )
}

export default Navbar;