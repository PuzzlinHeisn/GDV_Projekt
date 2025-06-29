import React, {useMemo} from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import wohnungenDataKaiserslautern from '../../utils/processedDataKaiserslautern';
import wohnungenDataMannheim from '../../utils/processedDataMannheim';
import { get_average_data } from '../../utils/getAverageData';
const COLORS = ['#0088FE', '#FF8042']; // Mannheimer Blau, KL Orange
const StadtPieChart = ({dataKey}) => {
  const average_ma = useMemo(() => get_average_data(wohnungenDataMannheim, dataKey), [dataKey]);
  const average_kl = useMemo(() => get_average_data(wohnungenDataKaiserslautern, dataKey), [dataKey]); 
  const data = [
    { name: "Mannheim", value: average_ma },
    { name: "Kaiserslautern", value: average_kl }

  ]; 
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, value }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={26} stroke='black' fontWeight="bold" strokeWidth={1}>
      {`${name}: ${value.toFixed(0)} `}
    </text>
  );
};
    return (
      <ResponsiveContainer width="100%" height="90%">
        <PieChart >
          <Pie
            dataKey={"value"}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={160}
            fill="#8884d8"
            label={renderCustomizedLabel}
            
            
          >
             {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  
};
export default StadtPieChart;
