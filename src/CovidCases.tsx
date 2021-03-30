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
      <Space direction="horizontal" size={8} className="navigation">
        <Button type="primary" href="/home">
          Return to Home
        </Button>
        <Button className="homePageButton" type="primary" href="/Vaccines">
          Vaccines
        </Button>
        <Button
          className="homePageButton"
          type="primary"
          href="/treatments-and-vaccines"
        >
          Treatments and Vaccines
        </Button>
        <Button className="homePageButton" type="primary" href="/health-info">
          Recovery
        </Button>

        <Button
          className="homePageButton"
          type="primary"
          href="https://docs.google.com/document/d/11WB6BY0G19YKHv7wFfgzVgMeFPyhoawcrPpXn2iMfWw/edit?usp=sharing"
          target="_blank"
        >
          Report Paper
        </Button>
      </Space>
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
    </div>
  );

  function sortByDate(a: any, b: any) {
    return moment(a.date).isAfter(moment(b.date)) ? 1 : -1;
  }
};

export default CovidCases;
