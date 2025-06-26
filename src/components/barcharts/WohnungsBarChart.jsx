import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Label } from "recharts";
import { priceToColor } from "../../utils/utilFunctions";
import { invertHexColor } from "../../utils/utilFunctions";
import CustomTooltip from "../../utils/customToolTop";
const WohnungsBarChart = ({ data, selected, dataKey, label}) => {
    const validPrices = data
        .map(d => d.price_per_qm)
        .filter(p => typeof p === 'number' && p > 0 && !isNaN(p));
    const logPrices = validPrices.map(p => Math.log(p));
    const minLog = Math.min(...logPrices);
    const maxLog = Math.max(...logPrices);
    return(
        <ResponsiveContainer width="100%" height={180}>
            <BarChart data = {data}>
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey={dataKey}>

                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${entry.id ?? index}`}
                            fill={entry.title === selected
                                ? '#ffffff'
                                : entry.color
                            }
                            stroke={entry.title === selected ? '#000000' : undefined}
                            strokeWidth={entry.title === selected ? 6 : 1}
                            />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}

export default WohnungsBarChart;