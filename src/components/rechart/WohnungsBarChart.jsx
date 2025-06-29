import React, {useMemo} from "react";
import { BarChart, Bar, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";
import CustomTooltip from "../../utils/customToolTop";
const WohnungsBarChart = ({ data, selected, dataKey, foundApartement }) => {
    let max_y = null;
  if (dataKey === "qm") {
    max_y = 200;
  } else if (dataKey === "price_per_qm") {
    max_y = 65;
  } else if (dataKey === "distance_to_center") {
    max_y = 10;
  }

  const cells = useMemo(() => data.map((entry, index) => {
    const isSelected = entry.title === selected;
    const isFound = entry.title === foundApartement?.title;
    const fillColor = isSelected ? '#FFFEC7' : isFound ? '#FF6EC7' : entry.color;
    const strokeWidth = isSelected || isFound ? 15 : 2;
    return (
      <Cell
        key={`cell-${entry.id ?? entry.title ?? index}`}
        fill={fillColor}
        stroke={fillColor}
        strokeWidth={strokeWidth}
      />
    );
  }), [data, selected, foundApartement]);

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data}>
        <YAxis domain={[0,max_y]} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey={dataKey} name={getLabelName(dataKey)}>
          {cells}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WohnungsBarChart;

const getLabelName = (key) => {
  switch (key) {
    case "qm":
      return "Fläche (qm)";
    case "price_per_qm":
      return "Preis pro qm (€)";
    case "distance_to_center":
      return "Entfernung zum Zentrum (km)";
    default:
      return key;
  }
};
