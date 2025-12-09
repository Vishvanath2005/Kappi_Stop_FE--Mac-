import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarCharts = () => {
  const data = [
    { name: "A", value: 30 },
    { name: "B", value: 20 },
    { name: "C", value: 45 },
    { name: "D", value: 30 },
    { name: "E", value: 50 },
    { name: "F", value: 30 },
    { name: "G", value: 40 },
  ];

  const colors = [
    { fill: "#dbeafe", stroke: "blue" },
    { fill: "#fee2e2", stroke: "red" }, 
    { fill: "#dcfce7", stroke: "green" }, 
  ];

  return (
    <div className="w-full ">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6b7280" }}
          />
          <YAxis hide />
          <Tooltip />

          <Bar
            dataKey="value"
            shape={(props) => {
              const { x, y, width, height, index } = props;
              const { fill, stroke } = colors[index % 3];
              return (
                <g>
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={fill}
                    rx={2}
                  />
                  <line
                    x1={x}
                    x2={x + width}
                    y1={y}
                    y2={y}
                    stroke={stroke}
                    strokeWidth={2}
                  />
                </g>
              );
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarCharts;
