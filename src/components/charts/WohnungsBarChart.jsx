import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Label, Legend } from "recharts";
import { priceToColor } from "../../utils/utilFunctions";
import { invertHexColor } from "../../utils/utilFunctions";
import CustomTooltip from "../../utils/customToolTop";
const WohnungsBarChart = ({ data, selected, dataKey, foundApartement }) => {
  const validPrices = data
    .map(d => d.price_per_qm)
    .filter(p => typeof p === 'number' && p > 0 && !isNaN(p));
  const logPrices = validPrices.map(p => Math.log(p));
  const minLog = Math.min(...logPrices);
  const maxLog = Math.max(...logPrices);
  // foundApartement ggf. hinzufügen, wenn noch nicht in data
  const isFoundInData = foundApartement &&
    data.some((d) => d.title === foundApartement.title || d.id === foundApartement.id);

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data}>
        <YAxis domain={[0,20]} />
        <Tooltip content={<CustomTooltip />} />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKey}>

          {data.map((entry, index) => (
            <Cell
              key={`cell-${entry.id ?? entry.title ?? index}`}
              fill={
                entry.title === selected
                  ? '#FFFEC7'
                  : entry.title === foundApartement?.title
                    ? '#FF6EC7'
                    : entry.color
              }
              stroke={
                entry.title === selected
                  ? '#FFFEC7'
                  : entry.title === foundApartement?.title
                    ? '#FF6EC7'
                    : entry.color
              }
              strokeWidth={entry.title === selected ? 15 : entry.title == foundApartement?.title ? 15 : 2}
            />

          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default WohnungsBarChart;