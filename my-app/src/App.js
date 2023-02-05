
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./Components/Navbar";
import Home from "./Components/Patient/Home";
import Profile from "./Components/Patient/Profile";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import DoctorHome from "./Components/Doctor/DoctorHome";
import DoctorProfile from "./Components/Doctor/DoctorsProfile";
import Patientdeatils from "./Components/Doctor/Patientdeatils";
import DoctorPrescription from "./Components/Doctor/DoctorPrescriptionDetails";
import React, {useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import Adminhome from "./Components/Admin/Adminhome";
import Patient_data from "./Components/Admin/PatientsData";
import axios from "axios";


function App() {

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
    }, []);
 
  // console.log("curruser");
  // console.log(curruser);
  // const curruser=false;

  const RequireAuth = ({ children }) => {
    return curruser ? (children) : <Navigate to={"/"} />
  }
  // console.log("userStatus  " + curruser);
  return (
    <BrowserRouter>
      <Box sx={{ backgroundColor: "white" }}>
        <Navbar />
        <Routes>
          <Route exact path="/homepat" element={<RequireAuth><Home /></RequireAuth>} />
          <Route exact path="/" element={<Login />} />
          {/* <Route exact path="/Signup" element={<Signup />} /> */}
          <Route exact path="/DoctorHome" element={<RequireAuth><DoctorHome /></RequireAuth>} />
          <Route exact path="/Dprofile" element={<RequireAuth><DoctorProfile /></RequireAuth>} />
          <Route exact path="/Dpatientdeatils" element={<RequireAuth><Patientdeatils /></RequireAuth>} />
          <Route exact path="/Dprescription" element={<RequireAuth><DoctorPrescription /></RequireAuth>} />
          <Route exact path="/ADMIN" element={<RequireAuth><Adminhome /></RequireAuth>} />
          <Route exact path="/patienthistoryadmin" element={<RequireAuth><Patient_data /></RequireAuth>} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;