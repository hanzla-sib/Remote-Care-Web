import React, { useState } from "react";
import { Avatar, Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../Firebase/firebase-config";
import axios from 'axios';
const main_style = {
    // backgroundImage: `url("https://wallpaperaccess.com/full/624111.jpg")`,
    backgroundSize: "cover",
    height: "auto",
}

const style_Signup = {
    padding: 20,
    height: "500px",
    width: 300,
    margin: "50px auto"
}
const btn = {
    margin: "10px 0"
}

function Signup() {

    const navigate = useNavigate();
    const [details, setDetails] = useState({
        username: "",
        password: "",
        email: "",
        typeofuser:"",
        Gender:""

    });
const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, details.email, details.password);
            const studentObject = {
                Name: details.username,
                Email: details.email,
                Password: details.password,
                User_Type:details.typeofuser,
                Gender:details.Gender
            };
            axios.post('http://localhost:5000/Usersfunctions/create', studentObject)
                .then(res => console.log(res.data));
            console.log(user);
            navigate("/Loginpage");
        }
        catch (error) {
            alert("error");
        }

    }


    function handleChange(event) {

        const { name, value } = event.target;

        setDetails((prevValue => {
            return {
                ...prevValue,
                [name]: value
            };
        }));


    }



    return (
        <div style={main_style}>

            <p>.</p>

            <Grid>
                <Paper component={Stack} direction="column" justifyContent="center" elevation={10} style={style_Signup} sx={{ background: "-webkit-linear-gradient(left, #AFEEEE, #40E0D0)" }}>
                    <Grid align="center">
                        <Avatar sx={{ bgcolor: blue[500] }}>RM</Avatar>
                        <Typography variant="h4" sx={{ margin: "20px" }}>Signup</Typography>

                    </Grid>
                    <TextField sx={{ margin: "10px 0" }} name="username" label="username" placeholder="Enter username" onChange={handleChange} fullWidth required></TextField>
                    <TextField name="email" label="email" placeholder="Enter email" type="email" onChange={handleChange} fullWidth required></TextField>
                    <TextField sx={{ margin: "10px 0" }} name="password" label="password" placeholder="Enter password" onChange={handleChange} fullWidth required></TextField>
                    <div>
                        <label>Select one</label>
                        <input type="radio" name="typeofuser" value="Doctor" onChange={handleChange} />
                        Doctor
                        <input type="radio" name="typeofuser" value="Patient" onChange={handleChange} />
                        Patient
                    </div>
                    <div>
                        <label>Select Gender</label>
                        <input type="radio" name="Gender" value="Male" onChange={handleChange} />
                        Male
                        <input type="radio" name="Gender" value="Female" onChange={handleChange} />
                        Female
                        <input type="radio" name="Gender" value="Other" onChange={handleChange} />
                        Other
                    </div>


                    <Button onClick={register} type="submit" color="primary" variant="contained" fullWidth style={btn}>Signup</Button>
                    <Typography>
                        Already have a account?
                        <span>
                            <NavLink style={{ textDecoration: "none", color: "black", fontWeight: "bold" }} to="/Loginpage"> Login</NavLink>
                        </span>

                    </Typography>
                    <Typography>
                    {details.typeofuser}
                    </Typography>


                </Paper>
            </Grid>
        </div>
    );
}

export default Signup;