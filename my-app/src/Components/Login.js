import React, { useContext, useEffect, useState } from "react";
import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Link, Paper, Stack, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase-config";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

// Styling for the main container
const main_style = {
    backgroundImage: `url("https://wallpaperaccess.com/full/624111.jpg")`,
    backgroundSize: "cover",
};

// Styling for the login container
const style_login = {
    padding: 20,
    background: "#94ACAC",
    width: 300,
    margin: "auto",
};

// Styling for buttons
const btn = {
    margin: "10px 0",
};

// Function to delay execution for a given time
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function Login() {
    const { dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    // Function to sign out the user
    const signout = async () => {
        signOut(auth);
    };

    // State variables for email and password
    const [email, setemail] = useState("");
    const [password, setpass] = useState("");

    // Function to handle the login process
    const handlelogin = (e) => {
        e.preventDefault();
        fetchData();
    };

    // Fetches user data from the server and performs login
    async function fetchData() {
        try {
            const baseURL = "http://localhost:5000/mysql/get_user_type/" + email;
            await axios
                .get(`${baseURL}`)
                .then((response) => {
                    // Authenticate the user using Firebase authentication
                    signInWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            const user = userCredential.user;
                            console.log(user);
                            dispatch({ type: "LOGIN", payload: user });

                            // Navigate to the appropriate page based on the user type
                            if (response.data.user_type === "1") {
                                navigate("/homepat");
                            } else if (response.data.user_type === "2") {
                                navigate("/DoctorHome");
                            } else if (response.data.user_type === "0") {
                                navigate("/ADMIN");
                            } else {
                                alert("Email not found in MYSQL DB");
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (e) {
            console.error(e);
        }
    }

    // Clear localStorage and reload the page on component mount
    React.useEffect(() => {
        localStorage.clear();
        // window.location.reload();
    }, []);

    return (
        <Box style={main_style} sx={{ minWidth: "200px", height: { sx: "auto", md: "93.5vh", lg: "93.5vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
            <Grid>
                <Paper direction="column" justifyContent="center" elevation={10} style={style_login} sx={{ background: "-webkit-linear-gradient(left, #AFEEEE, #40E0D0)" }}>
                    <Grid align="center">
                        <Avatar sx={{ bgcolor: blue[500] }}>RM</Avatar>
                        <Typography variant="h4" sx={{ margin: "20px" }}>Login</Typography>
                    </Grid>
                    <form onSubmit={handlelogin}>
                        <TextField sx={{ margin: "10px 0" }} name="email" label="email" placeholder="Enter email" onChange={e => setemail(e.target.value)} fullWidth required></TextField>
                        <TextField name="password" label="password" placeholder="Enter password" type="password" onChange={e => setpass(e.target.value)} fullWidth required></TextField>
                        <FormControlLabel
                            control={<Checkbox defaultChecked color="info" />}
                            label="Remember me"
                        />
                        <Button type="submit" color="primary" variant="contained" fullWidth style={btn}>Login</Button>
                    </form>
                    <Typography sx={{ margin: "5px 0" }}>
                        <Link href="#">Forgot password</Link>
                    </Typography>
                    <Typography>
                        Don't have an account?
                        <span>
                            <NavLink style={{ textDecoration: "none", color: "black", fontWeight: "bold" }} to="/Signup"> Signup</NavLink>
                        </span>
                    </Typography>
                    <Typography>
                        <Button onClick={signout} color="primary" variant="contained" fullWidth style={btn}>Logout</Button>
                    </Typography>
                </Paper>
            </Grid>
        </Box>
    );
}

export default Login;
