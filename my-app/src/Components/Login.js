import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, Stack, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { NavLink, useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase-config";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
const main_style = {
    // backgroundImage: `url("https://wallpaperaccess.com/full/624111.jpg")`,
    backgroundSize: "cover",
    height: "auto",
}

const style_login = {
    padding: 40,
    height: "500px",
    width: 300,
    margin: "50px auto"
}
const btn = {
    margin: "10px 0"
}



const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);



function Login() {

    const { dispatch } = useContext(AuthContext);

    const navigate = useNavigate();
    const signout = async () => {
        signOut(auth);
    }

    const [email, setemail] = useState("");
    const [password, setpass] = useState("");
    const handlelogin = (e) => {
        e.preventDefault();
        fetchData();
    }


    async function fetchData() {
        try {
            // await delay(1000);
            const baseURL = "http://localhost:5000/mysql/get_user_type/" + email;
            await axios.get(`${baseURL}`).then((response) => {
                signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                dispatch({ type: "LOGIN", payload: user })
               
                if(response.data.user_type==="1"){
                    navigate("/homepat");
                }
                else if(response.data.user_type==="2"){
                    navigate("/DoctorHome");
                }
                else if(response.data.user_type==="0"){
                    navigate("/ADMIN");
                }
                else{
                    alert("Email not found in MYSQL DB");
                }
            
               
            })
            .catch((error) => {
                console.log(error);
            })
            }).catch(error => {
                console.log(error);
            });
        } catch (e) {
            console.error(e);
        }
    };


    return (
        <div style={main_style}>
            <p>.</p>
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
                            control={
                                <Checkbox defaultChecked color="info" />}
                            label="Remember me"
                        />

                        <Button type="submit" color="primary" variant="contained" fullWidth style={btn}>Login</Button>
                    </form>
                    <Typography sx={{ margin: "5px 0" }}>
                        <Link href="#">
                            Forgot password
                        </Link>
                    </Typography>
                    <Typography>

                        Don't have a account?
                        <span>
                            <NavLink style={{ textDecoration: "none", color: "black", fontWeight: "bold" }} to="/Signup"> Signup</NavLink>
                        </span>
                    </Typography>
                    <Typography>
                        {/* {auth.currentUser.email} */}
                        {/* {auth.currentUser.uid} */}
                        <Button onClick={signout} color="primary" variant="contained" fullWidth style={btn}>Logout</Button>
                    </Typography>


                </Paper>
            </Grid>
        </div>
    );
}

export default Login;