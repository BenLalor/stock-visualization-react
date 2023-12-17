import React, { useState, useEffect } from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

function MonthlyGraph({ preproccesedData }) {
  const [postProcessedData, setpostProcessedData] = useState([]);
  useEffect(() => {
    if (preproccesedData) {
      const transformedData = Object.entries(
        preproccesedData["Time Series (5min)"]
      ).map(([date, values]) => {
        const parsedDate = new Date(date);
        const formattedTime =
          parsedDate.getHours() + ":" + parsedDate.getMinutes();
        return {
          date: formattedTime,
          close: parseFloat(values["4. close"]),
        };
      });
      setpostProcessedData(transformedData);
    }
  }, [preproccesedData]);

  return (
    <div className="App">
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={postProcessedData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area dataKey="close" stroke="#2451B7" fill="url(#color)" />
          <CartesianGrid opacity={0.1} fillOpacity={0.1} vertical={false} />
          <XAxis dataKey="date" />
          <YAxis
            tickCount={9}
            axisLine={false}
            domain={["dataMin", "dataMax"]}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyGraph;
