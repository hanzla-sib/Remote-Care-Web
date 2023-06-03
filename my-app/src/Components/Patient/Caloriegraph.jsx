import { Typography } from "@mui/material"; // Importing the Typography component from the "@mui/material" library
import axios from "axios"; // Importing the axios library for making HTTP requests
import React, { useContext } from "react"; // Importing React and the useContext hook
import { AuthContext } from "../../Context/AuthContext"; // Importing the AuthContext from a specific file location
import SimpleAreaChart from "../Chart"; // Importing the SimpleAreaChart component from a specific file location

function Caloriegraph({ setreloader }) {
    const { curruser } = useContext(AuthContext); // Accessing the curruser value from the AuthContext using the useContext hook
    const [checktrue, settrue] = React.useState(false); // Creating a state variable checktrue and a function settrue to update it
    const [post, setPost] = React.useState([]); // Creating a state variable post and a function setPost to update it
    const [error, setError] = React.useState({}); // Creating a state variable error and a function setError to update it

    React.useEffect(() => {
        async function fetchData() {
            try {
                // await delay(1000);
                const baseURL =
                    "http://localhost:5000/mysql/getCaloriegraph/" + curruser.email; // Setting the baseURL for the HTTP request
                await axios
                    .get(`${baseURL}`) // Making a GET request to the specified URL
                    .then((response) => {
                        post.length = 0; // Clearing the post array
                        for (var i = 0; i < response.data.length; i++) {
                            post.push({
                                name: response.data[i].date_log,
                                uv: response.data[i].Calories,
                            }); // Adding data to the post array
                        }
                    })
                    .catch((error) => {
                        setError(error); // Setting the error state variable if the request fails
                    });
            } catch (e) {
                console.error(e);
            }
        }
        fetchData(); // Calling the fetchData function when the component mounts or setreloader changes
    }, [setreloader]);

    return (
        <div>
            <Typography display={"none"}>{setreloader}</Typography>
            <SimpleAreaChart arr={post} />
            {/* Rendering the SimpleAreaChart component and passing the post array as a prop */}
        </div>
    );
}

export default Caloriegraph;
