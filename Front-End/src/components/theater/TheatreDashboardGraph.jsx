import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import {useState,useEffect} from 'react';

import {useSelector} from "react-redux"

import {theatreGraphInfo} from "../../api/theater/theaterApi"


const data = [
  {
    name: 'Jan',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Mar',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Apr',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Jun',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Jul',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Aug',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Sep',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Oct',
    uv: 3490,
    pv: 4300,
    amt: 2100,

  },
  {
    name: 'Nov',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Dec',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  }
];

function TheatreDashboardGraph() {
  const theatreId =useSelector((store)=>store.theatre.theatreDetails.theatreId)
  const [graphData,setGraphData]=useState([])
  useEffect(()=>{
    async function fetchInfo(){
      const data =await theatreGraphInfo(theatreId);
     setGraphData(data?.response)
    }
    fetchInfo()
  
  },[])
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  return (
    <div>
     
    <div className='mt-[4rem]'>
    <h1 className='flex item-center justify-center text-orange-300'>graph </h1>
    <ResponsiveContainer  height={300}>
      
      <BarChart
          data={monthNames.map((monthName, index) => ({
            name: monthName,
            Bookings: graphData.find(item => item.month === index + 1)?.data[0].count || 0,
          }))}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Bookings" fill="#8884d8" />
        {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
      </BarChart>
    </ResponsiveContainer>
    </div>
    </div>
  );
}

export default TheatreDashboardGraph;
