import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Space } from "antd";

const HomePage: React.FC = () => {
  return (
    <div className="d-flex flex-column text-style">
      <Space direction="vertical" size={8}>
        <img src="./UofABanner.png" className="bannerStyle" />
        <Button type="primary" href="/covid-cases">
          Covid Cases
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
};

export default HomePage;
