import React from "react";
import { ComposedChart, Bar, XAxis, YAxis, Legend, Tooltip } from "recharts";
import "./Admin.css";

const data = [
  {
    name: "Page A",
    salary: 4000,
  },
  {
    name: "Page B",
    salary: 3000,
  },
  {
    name: "Page C",
    salary: 2780,
  },
  {
    name: "Page D",
    salary: 2780,
  },
  {
    name: "Page E",
    salary: 1890,
  },
  {
    name: "Page F",
    salary: 2390,
  },
  {
    name: "Page G",
    salary: 3490,
  },
];

export default function Graph() {
  return (
    <div className="graph_container">
      <div className="stats_title">업종별 연봉 통계</div>

      <ComposedChart layout="vertical" width={470} height={400} data={data}>
        <Legend className="legend" />
        <XAxis className="xAxis" type="number" />
        <YAxis className="yAxis" type="category" dataKey="name" />
        <Tooltip className="tooltip" />
        <Bar dataKey="salary" fill="var(--button-color)" />
      </ComposedChart>
    </div>
  );
}
