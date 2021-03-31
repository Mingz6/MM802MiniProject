/**
 * Vaccines Type charts
 * File will read the csv and draw 2 pies chart
 * one for vaccines type and one for vaccines development stage
 */
import React, { useState, useEffect, useCallback } from "react";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import { readString } from "react-papaparse";
import "./App.css";
import { PageHeader, Typography} from "antd";

interface IPieData {
  name: string;
  value: number;
}
const { Paragraph } = Typography;

const TreatmentsAndVaccines: React.FC = () => {
  const [productCategory, setProductCategory] = useState<IPieData[]>([]);
  const [stageOfDevelopment, setStageOfDevelopment] = useState<IPieData[]>([]);

  const loadData = useCallback(async () => {
    const response = await fetch("Treatments and Vaccines.csv");
    const reader = response.body?.getReader();
    const result = await reader?.read();
    const decoder = new TextDecoder("utf-8");
    const csv = await decoder.decode(result?.value);
    const convertedCSV = readString(csv, { header: true, dynamicTyping: true });
    const results = convertedCSV.data;

    const tempCategory: any[] = [];
    results.forEach((r: any) => {
      if (!tempCategory.some((pc) => pc.name === r.ProductCategory)) {
        if (r.ProductCategory !== undefined) {
          tempCategory.push({ name: r.ProductCategory, value: 1 });
        }
      } else {
        let index = tempCategory.findIndex(
          (pc) => pc.name === r.ProductCategory
        );
        tempCategory[index].value += 1;
      }
    });
    setProductCategory(tempCategory);

    const tempStage: any[] = [];
    results.forEach((r: any) => {
      if (!tempStage.some((pc) => pc.name === r.StageOfDevelopment)) {
        if (r.StageOfDevelopment !== undefined) {
          tempStage.push({ name: r.StageOfDevelopment, value: 1 });
        }
      } else {
        let index = tempStage.findIndex(
          (pc) => pc.name === r.StageOfDevelopment
        );
        tempStage[index].value += 1;
      }
    });
    setStageOfDevelopment(tempStage);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#ff0000",
    "#ff4000",
    "#ff8000",
    "#ffbf00",
    "#ffff00",
    "#bfff00",
    "#ffbf00",
    "#ffff00",
    "#bfff00",
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <PageHeader
        className="Vaccines Pie Chart"
        title="Vaccines Pie Chart"
        subTitle="This pie chart shows the percentage of different type and stage of vaccines under development"
      />
      <div className="rowC">
      <Paragraph style={{marginRight:30, marginLeft: 50}}>
      This pie chart clearly show us the percentage of different type of vaccines under development. It is clear that protein subunit
      is the most common vaccines types and followed by RNA-based and non-replicating viral.
      </Paragraph>
      <Paragraph style={{marginRight:30}}>Although a large number of medical companies and institutions around the world have invested in the research and
         development of the Covid vaccine. But most of them are still in the preliminary stage. Only a very small number of vaccines 
         have completed clinical trials. </Paragraph>
    </div>
    <div className='rowC' style={{marginLeft: 50}}>
      <PieChart width={750} height={745}>
        <Pie
          dataKey="value"
          data={productCategory}
          cx="50%"
          cy="50%"
          outerRadius={250}
          fill="#8884d8"
          labelLine={true}
          label={renderCustomizedLabel}
        >
          {productCategory.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
        </PieChart>
        <PieChart width={750} height={700}>
        <Pie
          dataKey="value"
          data={stageOfDevelopment}
          cx="50%"
          cy="50%"
          outerRadius={250}
          fill="#82ca9d"
          labelLine={true}
          label={renderCustomizedLabel}
        >
          {stageOfDevelopment.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>

    </div>
  );
};

export default TreatmentsAndVaccines;
