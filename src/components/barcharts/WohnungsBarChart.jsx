import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Label } from "recharts";
import { priceToColor } from "../../utils/utilFunctions";
import { invertHexColor } from "../../utils/utilFunctions";
import CustomTooltip from "../../utils/customToolTop";
const WohnungsBarChart = ({ data, selected, dataKey, foundApartement}) => {
    const validPrices = data
        .map(d => d.price_per_qm)
        .filter(p => typeof p === 'number' && p > 0 && !isNaN(p));
    const logPrices = validPrices.map(p => Math.log(p));
    const minLog = Math.min(...logPrices);
    const maxLog = Math.max(...logPrices);
      // foundApartement ggf. hinzufügen, wenn noch nicht in data
  const isFoundInData = foundApartement &&
    data.some((d) => d.title === foundApartement.title || d.id === foundApartement.id);

 /* const extendedData = !isFoundInData && foundApartement
  ? [...data, {
      ...foundApartement,
      color: priceToColor(Math.log(foundApartement.price_per_qm), minLog, maxLog)
    }]
  : [...data]; // <-- wichtig: Kopie selbst im "else"-Fall!

   extendedData.sort((a, b) => a[dataKey] - b[dataKey]);
  */
    return(
        <ResponsiveContainer width="100%" height={180}>
            <BarChart data = {data}>
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey={dataKey}>

                    {data.map((entry, index) => (
                       <Cell
  key={`cell-${entry.id ?? entry.title ?? index}`}
  fill={
    entry.title === selected
      ? '#ffffff'
      : entry.title === foundApartement?.title
        ? '#FF6EC7'
        : entry.color
  }
  stroke={
    entry.title === selected
      ? '#FFFFFF'
      : entry.title === foundApartement?.title
        ? '#39FF14'
        : entry.color
  }
  strokeWidth={entry.title === selected ? 6 : entry.title == foundApartement?.title ? 3 : 1}
/>

                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}

export default WohnungsBarChart;