import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Mon", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Tue", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Wed", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Thu", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Fri", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Sat", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Sun", uv: 3490, pv: 4300, amt: 2100 }
];

const SimpleAreaChart = () => {
  let changevariable = 0;
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 1330;

  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);
  if (width > breakpoint) {
    changevariable = 500;
  }
  else if (width <= breakpoint && width >= 1239) {
    changevariable = 450;
  }
  else if (width <= 1239 && width >= 1175) {
    changevariable = 420;
  }
  else if (width <= 1175 && width >= 1000) {
    changevariable = 330;
  }
  else if (width <= 1000 && width >= 900) {
    changevariable = 280;
  }
  else if (width <= 900 && width >= 850) {
    changevariable = 500;
  }
  else if (width <= 850 && width >= 790) {
    changevariable = 460;
  }
  else if (width <= 790 && width >= 730) {
    changevariable = 410;
  }
  else if (width <= 730 && width >= 680) {
    changevariable = 350;
  }
  else if (width <= 680 && width >= 626) {
    changevariable = 300;
  }
  else if (width <= 626 && width >= 576) {
    changevariable = 250;
  }
  else if (width <= 576 && width >= 499) {
    changevariable = 290;
  }
  else if (width <= 499) {
    changevariable = 230;
  }
  return (

    <ResponsiveContainer  height={200} width={changevariable}>


      <BarChart  data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};


export default SimpleAreaChart;