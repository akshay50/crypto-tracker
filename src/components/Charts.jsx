import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const Chart = ({ data }) => {
  // Recharts works best with an array of objects.
  // Convert the raw array of prices into an array of objects with an index "time" value.
  const chartData = data.map((price, index) => ({
    time: index, // or you can use timestamps if you have time series data
    price,
  }));

  return (
    <ResponsiveContainer width="100%" height={100}>
      <LineChart data={chartData}>
        {/* You can adjust the stroke/color values as needed */}
        <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
        <Tooltip
          formatter={(value) => [`$${value.toLocaleString()}`, 'Price']}
        />
        {/* Hide axes for a minimalistic sparkline view */}
        <XAxis dataKey="time" hide={true} />
        <YAxis hide={true} domain={['dataMin', 'dataMax']} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
