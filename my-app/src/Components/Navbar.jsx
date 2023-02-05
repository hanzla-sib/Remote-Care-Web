import React, { useContext } from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";


const Styledbar = styled(Toolbar)({
    justifyContent: "space-between",
});



function Navbar() {
    const { curruser } = useContext(AuthContext);
   
    const [checktrue, settrue] = React.useState(false);
    const [post, setPost] = React.useState({});
    const [error, setError] = React.useState({});
    const [reloder, setreloader] = React.useState(0);
    const [reloderappoint, setreloderappoint] = React.useState(0);
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
      }, [reloderappoint]);

    const logout = async () => {
        localStorage.clear();
        window.location.reload();
      }
    return (
        <AppBar p={2} sx={{ position: "sticky", backgroundColor: "#293148" }}>
            <Toolbar variant="dense" >
            <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 0.1 }}
          >
           REMCARE

          </Typography>
          
                {/* <Typography 
            variant="h5"
            sx={{ flexGrow: 1,fontStyle:"italic"}}>Hi {post.name}</Typography> 
                <Button  sx={{  display: { xs: 'none', sm: 'block' } }} variant="contained" onClick={logout}>logout</Button> */}
            </Toolbar>
        </AppBar>

    )
}

export default Navbar;