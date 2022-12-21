import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import SimpleAreaChart from "../Chart"
function Caloriegraph() {

    const { curruser } = useContext(AuthContext);
    const [checktrue, settrue] = React.useState(false);
    const [post, setPost] = React.useState([]);
    const [error, setError] = React.useState({});

    React.useEffect(() => {
        async function fetchData() {
            try {
                // await delay(1000);
                const baseURL = "http://localhost:5000/mysql/getCaloriegraph/" + curruser.email;
                await axios.get(`${baseURL}`).then((response) => {
                    console.log(response.data);
                    for(var i=0;i<response.data.length;i++){
                        post.push({name:response.data[i].date_log,uv:response.data[i].Calories});
                        // post.push({name:response.data[i].date_log,uv:response.data[i].Calories});
                    }
                    // setPost(response.data);
                    console.log("-----------");
                    console.log(post);
                    
                }).catch(error => {
                    setError(error);
                });
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);

    return (
        <SimpleAreaChart arr={post}/>
    )
}

export default Caloriegraph;