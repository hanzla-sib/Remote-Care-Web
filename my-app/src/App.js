
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
import {useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import Health_record from "./Components/Patient/Health_Record";

function App() {

  const { curruser } = useContext(AuthContext);
  console.log(curruser);
  // const curruser=false;

  const RequireAuth = ({ children }) => {
    return curruser ? (children) : <Navigate to={"/Signup"} />
  }
  console.log("userStatus  " + curruser);
  return (
    <BrowserRouter>
      <Box sx={{ backgroundColor: "white" }}>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<RequireAuth><Home /></RequireAuth>} />
          {/* <Route exact path="/Profile" element={<RequireAuth><Profile /></RequireAuth>} /> */}
          {/* <Route exact path="/HealthRecord" element={<RequireAuth><Health_record /></RequireAuth>} /> */}
          <Route exact path="/Loginpage" element={<Login />} />
          <Route exact path="/Signup" element={<Signup />} />
          <Route exact path="/DoctorHome" element={<RequireAuth><DoctorHome /></RequireAuth>} />
          <Route exact path="/Dprofile" element={<RequireAuth><DoctorProfile /></RequireAuth>} />
          <Route exact path="/Dpatientdeatils" element={<RequireAuth><Patientdeatils /></RequireAuth>} />
          <Route exact path="/Dprescription" element={<RequireAuth><DoctorPrescription /></RequireAuth>} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;