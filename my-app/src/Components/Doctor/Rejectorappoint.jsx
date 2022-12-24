import { Button, Card, CardContent, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
// import { DatePicker, DesktopDatePicker } from "@mui/x-date-pickers";

function RejectAppoint({setreloader}) {
  const [date, setDate] = useState('');
  const dateInputRef = useRef(null);

  const handleChange = (e) => {
    setDate(e.target.value);
  };

  const [time, setTime] = useState('');
  const TimeInputRef = useRef(null);

  const TimehandleChange = (e) => {
    setTime(e.target.value);
  };


  const { curruser } = useContext(AuthContext);
  const [getallapppoint, fetallappoint] = React.useState([]);
  const [getupdate, setupdate] = React.useState(0);
  React.useEffect(() => {
    async function fetchData() {
      try {
        var array1 = [];
        // await delay(1000);
        const baseURL = "http://localhost:5000/mysql/DoctorPendingAppoint/" + curruser.email;
        await axios.get(`${baseURL}`).then((response) => {
          // console.log(response.data.length);

          for (var i = 0; i < response.data.length; i++) {
            array1[i] = response.data[i];
          }
          fetallappoint(array1);
          if (getallapppoint.length === 1) {
            // fetallappoint();
          }
        }).catch(error => {

        });
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [getupdate]);


  const AcceptReq = async (p_email) => {


    

    try {
     

      const objec = {
        time1:time,
        date1:date,
        pat_email: p_email,
        doc_email: curruser.email
      }
      var min = 1;
      var max = 1000;
      var rand =  min + (Math.random() * (max-min));
      const resp = await axios.post('http://localhost:5000/mysql/AcceptAppointment', objec);
      alert(resp.data);
      setreloader(rand);
      setupdate(rand);
    } catch (err) {
      console.error(err);
    }
  };


  const RejectReq = async (p_email) => {
    try {
      const objec = {
        pat_email: p_email,
        doc_email: curruser.email
      }
      var min = 1;
      var max = 1000;
      var rand =  min + (Math.random() * (max-min));
      const resp = await axios.post('http://localhost:5000/mysql/RejectAppointment', objec);
      alert(resp.data);
      setreloader(rand);
      setupdate(rand);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Card style={{ border: "none", boxShadow: "none" }} sx={{ maxWidth: 450 }}>
      <CardContent>
        <Typography variant="h6"  >
          Appointment Requests
        </Typography>
        <Grid container width="440px" >
          <List >
            {getallapppoint.map((value) => (
              <Grid container direction="column" width="450px" >
                <ListItem>
                  <Grid direction="row" width="200px">
                    <ListItemText >{value.p_name}</ListItemText>
                    <Button onClick={(e) => AcceptReq(value.p_email)} sx={{ marginRight: "10px" }} variant="contained">Accept</Button>
                    <Button onClick={(e) => RejectReq(value.p_email)} variant="contained">Reject</Button>
                  </Grid>
                  <Grid>
                    <input
                      type="date"
                      onChange={handleChange}
                      ref={dateInputRef}
                    />

                  </Grid>
                  <Grid>
                  <input
                      type="time"
                      onChange={TimehandleChange}
                      ref={TimeInputRef}
         
                    />


                  </Grid>
                </ListItem>

              </Grid>
            ))}

          </List>
        </Grid>

      </CardContent>
    </Card>
  )
}
export default RejectAppoint;