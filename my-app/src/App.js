// Import required modules and components
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
import React, { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import Adminhome from "./Components/Admin/Adminhome";
import Patient_data from "./Components/Admin/PatientsData";
import axios from "axios";

function App() {
  // Access the current user object from the AuthContext
  const { curruser } = useContext(AuthContext);

  // Set up state variables
  const [checktrue, settrue] = React.useState(false);
  const [post, setPost] = React.useState({});
  const [error, setError] = React.useState({});
  const [reloder, setreloader] = React.useState(0);
  const [reloderappoint, setreloderappoint] = React.useState(0);

  // Fetch data from the server when the component mounts
  React.useEffect(() => {
    async function fetchData() {
      try {
        const baseURL = "http://localhost:5000/mysql/get_user_type/" + curruser.email;
        const response = await axios.get(`${baseURL}`);
        setPost(response.data);
        settrue(true);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  // Define a custom component for requiring authentication
  const RequireAuth = ({ children }) => {
    return curruser ? (children) : <Navigate to={"/"} />;
  }

  return (
    <BrowserRouter>
      <Box sx={{ backgroundColor: "white" }}>
        {/* Render the Navbar component */}
        <Navbar />

        {/* Define the routing hierarchy */}
        <Routes>
          {/* Route for the home page */}
          <Route exact path="/homepat" element={<RequireAuth><Home /></RequireAuth>} />

          {/* Route for the login page */}
          <Route exact path="/" element={<Login />} />

          {/* Route for the Doctor's home page */}
          <Route exact path="/DoctorHome" element={<RequireAuth><DoctorHome /></RequireAuth>} />

          {/* Route for the Doctor's profile page */}
          <Route exact path="/Dprofile" element={<RequireAuth><DoctorProfile /></RequireAuth>} />

          {/* Route for displaying patient details for a doctor */}
          <Route exact path="/Dpatientdeatils" element={<RequireAuth><Patientdeatils /></RequireAuth>} />

          {/* Route for displaying a doctor's prescription details */}
          <Route exact path="/Dprescription" element={<RequireAuth><DoctorPrescription /></RequireAuth>} />

          {/* Route for the Admin home page */}
          <Route exact path="/ADMIN" element={<RequireAuth><Adminhome /></RequireAuth>} />

          {/* Route for displaying patient history in the admin panel */}
          <Route exact path="/patienthistoryadmin" element={<RequireAuth><Patient_data /></RequireAuth>} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
