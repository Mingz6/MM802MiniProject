import React, { useState, useEffect, useCallback } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { readString } from "react-papaparse";
import "./App.css";
import moment from "moment";
import { Button, Space } from "antd";

const CovidCases: React.FC = () => {
  const [cases, setCases] = useState<any[]>([]);

  const loadData = useCallback(async () => {
    const response = await fetch("covid19-download.csv");
    const reader = response.body?.getReader();
    const result = await reader?.read();
    const decoder = new TextDecoder("utf-8");
    const csv = await decoder.decode(result?.value);
    const convertedCSV = readString(csv, { header: true, dynamicTyping: true });
    // console.log(data);
    const filteredCases = convertedCSV.data
      .filter((c: any) => c.prname === "Canada")
      .sort(sortByDate);
    setCases(filteredCases);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="container-fluid">
      <h1>Canada Covid-19 number of confirmed and number of deaths</h1>
      <LineChart
        width={1200}
        height={600}
        data={cases}
        className="height-fix"
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="numconf" stroke="blue" />
        <Line type="monotone" dataKey="numdeaths" stroke="red" />
      </LineChart>

      <Space direction="horizontal" size={8}>
        <Button type="primary" href="/home">
          Return to Home
        </Button>
        <Button type="primary" href="/treatments-and-vaccines">
          Treatments and Vaccines
        </Button>
        <Button type="primary" href="/health-info">
          Health Info
        </Button>
      </Space>
    </div>
  );

  function sortByDate(a: any, b: any) {
    return moment(a.date).isAfter(moment(b.date)) ? 1 : -1;
  }
};

export default CovidCases;
