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
import { useState, useEffect } from 'react';
import { adminGraphInfo } from '../../api/admin/adminApi';

function AdminDashGraph() {
  const [UsergraphData, setUserGraphData] = useState([]);
  const [TheatregraphData, setTheatreGraphData] = useState([]);

  useEffect(() => {
    async function fetchInfo() {
      const data = await adminGraphInfo();
      setUserGraphData(data?.userData[0].result);
      setTheatreGraphData(data?.theatreData[0].result);
    }
    fetchInfo();
  }, [setUserGraphData,setTheatreGraphData]);

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  return (
    <div>
      <div>
        <div className='mt-[4rem]'>
          <h1 className='flex item-center justify-center text-orange-300'>User graph</h1>
          <ResponsiveContainer height={300}>
            <BarChart
              data={monthNames.map((monthName, index) => ({
                name: monthName,
                UserCounts: UsergraphData.find(item => item.month === index + 1)?.data[0].usercount || 0,
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
              <Bar dataKey="UserCounts" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <div className='mt-[4rem]'>
          <h1 className='flex item-center justify-center text-orange-300'>Theatre graph</h1>
          <ResponsiveContainer height={300}>
            <BarChart
               data={monthNames.map((monthName, index) => ({
                name: monthName,
                TheatreCounts: TheatregraphData.find(item => item.month === index + 1)?.data[0].theatrecount || 0,
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
              <Bar dataKey="TheatreCounts" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AdminDashGraph;
