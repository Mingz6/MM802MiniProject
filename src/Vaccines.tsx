import React, { FC, useCallback, useState, useEffect } from "react";
import { readString } from "react-papaparse";
import "antd/dist/antd.css";
import "./index.css";
import { Table, Tag, Progress, PageHeader } from "antd";

const columns = [
  {
    title: "Developer / Researcher",
    dataIndex: "Developer",
    key: "Developer",
    width: 250,
  },
  {
    title: "Product Category",
    dataIndex: "Category",
    key: "Category",
    width: 200,
    filters: [
      {
        text: "DNA-based",
        value: "DNA-based",
      },
      {
        text: "Inactivated virus",
        value: "Inactivated virus",
      },
      {
        text: "Replicating bacterial vector",
        value: "Replicating bacterial vector",
      },
      {
        text: "Unknown",
        value: "Unknown",
      },
      {
        text: "Virus-like particle",
        value: "Virus-like particle",
      },
      {
        text: "RNA-based vaccine",
        value: "RNA-based vaccine",
      },
      {
        text: "Replicating viral vector",
        value: "Replicating viral vector",
      },
      {
        text: "Protein subunit",
        value: "Protein subunit",
      },
      {
        text: "Non-replicating viral vector",
        value: "Non-replicating viral vector",
      },
      {
        text: "Live attenuated virus",
        value: "UnkLive attenuated virus",
      },
    ],
    onFilter: (value: any, record: any) => record.Category.indexOf(value) === 0,
    render: (Category: string) => {
      let color = "geekblue";
      if (Category === "Inactivated virus") {
        color = "volcano";
      } else if (Category === "Replicating bacterial vector") {
        color = "lime";
      } else if (Category === "Unknown") {
        color = "gold";
      } else if (Category === "Virus-like particle") {
        color = "red";
      } else if (Category === "RNA-based vaccine") {
        color = "yellow";
      } else if (Category === "Replicating viral vector") {
        color = "orange";
      } else if (Category === "Protein subunit") {
        color = "green";
      } else if (Category === "Non-replicating viral vector") {
        color = "gray";
      } else if (Category === "Live attenuated virus") {
        color = "blue";
      }
      return (
        <Tag color={color} key={Category}>
          {Category}
        </Tag>
      );
    },
  },
  {
    title: "Stage of Development",
    dataIndex: "Stage",
    key: "Stage",
    width: 350,
    onFilter: (value: any, record: any) => record.Stage.indexOf(value) === 0,
    filters: [
      {
        text: "Pre-clinical",
        value: "Pre-clinical",
      },
      {
        text: "Authorized",
        value: "Authorized",
      },
      {
        text: "Phase I",
        value: "Phase I",
      },
      {
        text: "Phase I/II",
        value: "Phase I/II",
      },
      {
        text: "Phase II",
        value: "Phase II",
      },
      {
        text: "Phase II/III",
        value: "Phase II/III",
      },
      {
        text: "Phase III",
        value: "Phase III",
      },
    ],
    render: (Stage: string) => {
      let percent = 0;
      if (Stage === "Pre-clinical") {
        percent = 20;
      } else if (Stage === "Phase I") {
        percent = 30;
      } else if (Stage === "Phase I/II") {
        percent = 35;
      } else if (Stage === "Phase II") {
        percent = 50;
      } else if (Stage === "Phase II/III") {
        percent = 60;
      } else if (Stage === "Phase III") {
        percent = 70;
      } else if (Stage === "Authorized") {
        percent = 100;
      }
      return (
        <div style={{ width: 200 }}>
          <Progress
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
            percent={percent}
            format={() => Stage}
          />{" "}
        </div>
      );
    },
  },
  {
    title: "Anticipated Next Steps",
    key: "Anticipated",
    dataIndex: "Anticipated Next Steps",
  },
  {
    title: "Date Last Updated",
    key: "Date",
    dataIndex: "Date Last Updated",
  },
];

const Vaccines: FC = () => {
  const [cases, setCases] = useState<any[]>([]);

  const loadData = useCallback(async () => {
    const response = await fetch("Vaccines.csv");
    const reader = response.body?.getReader();
    const result = await reader?.read();
    const decoder = new TextDecoder("utf-8");
    const csv = await decoder.decode(result?.value);
    const convertedCSV = readString(csv, {
      header: true,
      dynamicTyping: true,
    });
    const results = convertedCSV.data;
    setCases(results);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  console.log(cases);

  return (
    <div><PageHeader
    className="Vaccines Development Stage"
    title="Vaccines Development Stage"
    subTitle="The table shows the progress and basic situation of vaccines developed by various institutions"
  />
      <Table columns={columns} dataSource={cases}/>
    </div>
  );
};

export default Vaccines;
