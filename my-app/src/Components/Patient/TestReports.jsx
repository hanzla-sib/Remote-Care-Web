import { Avatar, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, ImageListItemBar, ListSubheader, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";


import { auth } from "../../Firebase/firebase-config";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';





function Tests() {
  const { curruser } = useContext(AuthContext);
  const [post, setPost] = React.useState([]);
  const [error, setError] = React.useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [valueimg, setvalueimg] = useState("");


  function clickme(val) {
    setvalueimg(val);
    setIsOpen(true);

  }

  React.useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      // var array1 = [{img:"",det:""}];
    
      // await delay(1000);
      const baseURL = "http://localhost:5000/mysql/get_test_record/" + curruser.email;
      for(var j=0;j<post.length;j++){
        post.pop();
    }
      await axios.get(`${baseURL}`).then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          // array1[0] = response.data[i].imageurl;
          // array1[1] = response.data[1].imageurl;
          // array1[2] = response.data[i].imageurl;
          // array1[3] = response.data[1].imageurl;
          // array1[4] = response.data[i].imageurl;
          // array1[5] = response.data[1].imageurl;
          // array1[6] = response.data[i].imageurl;
          // array2[0] = response.data[i].details;
          // array2[1] = response.data[1].details;
          // array2[2] = response.data[i].details;
          // array2[3] = response.data[1].details;
          // array2[4] = response.data[i].details;
          // array2[5] = response.data[1].details;
          // array2[6] = response.data[i].details;
          post.push({img:response.data[i].imageurl,det:response.data[i].details});


        }
        // setPost(array1);
      }).catch(error => {
        setError(error);
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <React.Fragment>

      <div className="app">
   

        {isOpen && <Lightbox
         
          mainSrc={`http://localhost/smd_project/${valueimg}`}

          onCloseRequest={() => setIsOpen(false)}

        />}
      </div>

    <ImageList sx={{ width:1250, height: 450 }} cols={6} rowHeight={164}>
        {post.map((value) => (
          <ImageListItem sx={{margin:"20px"}} onClick={() => clickme(value.img)} key={value}>
            <img
              src={`http://localhost/smd_project/${value.img}`}
              loading="lazy"
            />
             <ImageListItemBar
            title={value.det}
            
           
    
          />
       
          </ImageListItem>
          
        ))}
      </ImageList>
    


    </React.Fragment>


  )
}

export default Tests;
