import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
const data = [
  {name: 'Page A', teamA: 40, teamB: 45, amt: 2400, date: '2025-05-20'},
  {name: 'Page B', teamA: 30, teamB: 35, amt: 2400, date: '2025-05-21'},
  {name: 'Page С', teamA: 35, teamB: 30, amt: 2400, date: '2025-05-22'}
];

export const renderLineChart = (
  <LineChart width={400} height={400} data={data} margin={{ top: 50, right: 30, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey="teamA" stroke="#8884d8" />
    <Line type="monotone" dataKey="teamB" stroke="#8781d8" />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="date" />
    <YAxis orientation='right'  tickFormatter={(tick) => `${tick}%`} />
    <Tooltip formatter={(value) => `${value}%`} />
  </LineChart>
);