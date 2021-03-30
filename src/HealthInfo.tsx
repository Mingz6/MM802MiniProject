import React, { useState, useEffect, useCallback } from "react";
import { Treemap, Tooltip } from "recharts";
import { readString } from "react-papaparse";
import "./App.css";
import { Button, Space } from "antd";

interface TreeData {
  name: string;
  value: number;
}

const HealthInfo: React.FC = () => {
  const [productCategory, setProductCategory] = useState<TreeData[]>([]);

  const loadData = useCallback(async () => {
    const response = await fetch("vaccination-coverage.csv");
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

  const CustomizedContent = (props: any) => {
    const {
      root,
      depth,
      x,
      y,
      width,
      height,
      index,
      colors,
      name,
      value,
    } = props;
    console.log(value);

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill:
              depth < 2
                ? colors[Math.floor((index / root.children.length) * 6)]
                : "none",
            stroke: "#fff",
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {depth === 1 ? (
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor="middle"
            fill="#fff"
            fontSize={14}
          >
            {name}
          </text>
        ) : null}
        {depth === 1 ? (
          <text
            x={x + 4}
            y={y + 18}
            fill="#fff"
            fontSize={16}
            fillOpacity={0.9}
          >
            {index + 1}
          </text>
        ) : null}
      </g>
    );
  };

  return (
    <div className="container-fluid">
      <Space direction="horizontal" size={8} className="navigation">
        <Button type="primary" href="/home">
          Return to Home
        </Button>
        <Button className="homePageButton" type="primary" href="/covid-cases">
          Covid Cases
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
        <Button
          className="homePageButton"
          type="primary"
          href="https://docs.google.com/document/d/11WB6BY0G19YKHv7wFfgzVgMeFPyhoawcrPpXn2iMfWw/edit?usp=sharing"
          target="_blank"
        >
          Report Paper
        </Button>
      </Space>
      <h1>Recovery</h1>
      <Treemap
        width={400}
        height={200}
        data={productCategory}
        dataKey="size"
        stroke="#fff"
        fill="#8884d8"
        content={<CustomizedContent colors={COLORS} />}
      >
        <Tooltip />
      </Treemap>
    </div>
  );
};

export default HealthInfo;
