import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {Typography, Box, Stack} from '@mui/material';
import Sidebar from "./Sidebar";
import Steps from './Steps';
import CaloriesBurned from './CaloriesBurned';
import HeartBeat from './HeartBeat';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Health_record() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
     <Box sx={{ background: "linear-gradient(#304352, #3498db);", height: { sx: "auto", md: "93.5vh", lg: "93.5vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
      <Sidebar />
    </Box>
    <Box pl={"20px"} sx={{ overflowY: "auto", height: "93.5vh", flex: 2 ,backgroundColor: "#EEEEEE" }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Steps Count" {...a11yProps(0)} />
          <Tab label="Heart Beat" {...a11yProps(1)} />
          <Tab label="Calories Burned" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Steps />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <HeartBeat />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CaloriesBurned />
      </TabPanel>
    </Box>
    </Stack>
  );
}
export default Health_record;