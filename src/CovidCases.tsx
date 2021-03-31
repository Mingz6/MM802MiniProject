/**
 * Covid Case Line Chart component
 * The component will read the csv data file and draw a line chart base on the file
 */
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
import { PageHeader} from "antd";

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
    <div>
      <PageHeader
        className="Covid Case Chart"
        title="Covid Case Chart"
        subTitle="This chart shows number of infected and death in Canada."
      />
    <div className="container-fluid">
      <h1>Canada Covid-19 number of confirmed and number of deaths</h1>
      <LineChart width={1200} height={630} data={cases} className="height-fix" margin={{ top: 15, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" name="Infected" dataKey="numconf" stroke="blue" />
        <Line type="monotone" name="Deaths" dataKey="numdeaths" stroke="red" />
      </LineChart>
      <br/>
    </div>
    </div>
  );

  function sortByDate(a: any, b: any) {
    return moment(a.date).isAfter(moment(b.date)) ? 1 : -1;
  }
};

export default CovidCases;
