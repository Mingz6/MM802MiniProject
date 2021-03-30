import React, { useState, useEffect, useCallback } from "react";
import { Treemap, Tooltip } from "recharts";
import { readString } from "react-papaparse";
import "./App.css";
import { PageHeader} from "antd";

interface TreeData {
  name: string;
  children: TreeNode[];
}

interface TreeNode {
  name: string;
  size: number;
}

const defaultTree: TreeData[] = [
  {
    name: 'axis',
    children: [
      { name: 'Axes', size: 1302 },
      { name: 'Axis', size: 24593 },
      { name: 'AxisGridLine', size: 652 },
      { name: 'AxisLabel', size: 636 },
      { name: 'CartesianAxes', size: 6703 },
    ],
  }
]

class CustomizedContent extends React.PureComponent {
  render() {
    console.log(this.props);
    // @ts-ignore: not sure wdf is going on
    const { root, depth, x, y, width, height, index, colors, name } = this.props;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: depth < 2 ? colors[Math.floor((index / root.children.length) * 25)] : 'none',
            //fill: depth < 2 ? colors[index] : 'none',
            stroke: '#fff',
            strokeWidth: 3 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {depth === 1 ? (
          <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={16}>
            {name}
          </text>
        ) : null}
        {depth === 1 ? (
          <text x={x + 5} y={y + 20} fill="#fff" fontSize={16} fillOpacity={0.9}>
            {index + 1}
          </text>
        ) : null}
      </g>
    );
  }
}

const HealthInfo: React.FC = () => {
  const [data, setData] = useState<TreeData[]>(defaultTree);

  const loadData = useCallback(async () => {
    const response = await fetch("vaccination-coverage.csv");
    const reader = response.body?.getReader();
    const result = await reader?.read();
    const decoder = new TextDecoder("utf-8");
    const csv = await decoder.decode(result?.value);
    const convertedCSV = readString(csv, { header: true, dynamicTyping: true });
    const results = convertedCSV.data;
    const tempTreeData: TreeData[] = [];
    results.forEach((r: any) => {
      if (r.prename !== undefined) {
        let singleTreeData: TreeData = {
          name: r.prename,
          children: []
        };
        singleTreeData.children.push({ name: 'numtotal_1dose', size: r.numtotal_1dose });
        singleTreeData.children.push({ name: 'numtotal_2doses', size: r.numtotal_2doses });
        tempTreeData.push(singleTreeData);
      }
    });
    console.log(tempTreeData);
    setData(tempTreeData);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const COLORS = [
    "#8889DD",
    "#9597E4",
    "#8DC77B",
    "#A5D297",
    "#E2CF45",
    "#F8C12D",
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#ff0000",
    "#ff8000",
    "#ffbf00",
    "#bfff00",
    "#ffbf00",
    "#ffff00",
    "#9400D3",
    "#4B0082",
    "#0000FF",
    "#00FF00",
    "#FF0000",
  ];

  return (
    <div>
      <PageHeader
        className="Vaccines Coverage Chart"
        title="Vaccines Coverage Chart"
        subTitle="This chart shows how many people get at least one vaccine in each province."
      />
    <div className="container-fluid">
      <h1>Vaccine Coverage</h1>
      <Treemap
        width={1600}
        height={1000}
        data={data}
        dataKey="size"
        stroke="#fff"
        fill="#8884d8"
        //@ts-ignore
        content={<CustomizedContent colors={COLORS} />}
      >
        <Tooltip />
      </Treemap>
    </div>
    </div>
  );
};

export default HealthInfo;
