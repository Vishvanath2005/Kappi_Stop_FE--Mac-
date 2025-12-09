import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AreaCharts = () => {

  const data = [
    { month: "Jan", value: 40 },
    { month: "Feb", value: 35 },
    { month: "Mar", value: 38 },
    { month: "Apr", value: 45 },
    { month: "May", value: 30 },
    { month: "Jun", value: 55 },
    { month: "Jul", value: 50 },
  ];
  return (
    <div>
      <div className="w-full h-52 ">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4b5563" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4b5563" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              interval={0}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              spacing={0}
              padding={{ left: 10, right: 10 }}
              tickMargin={0}
            />
            <YAxis hide />
            <Tooltip cursor={false} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#4b5563"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaCharts;
