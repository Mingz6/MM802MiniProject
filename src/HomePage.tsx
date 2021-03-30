import * as React from "react";
/* import { Link } from "react-router-dom";*/
import { Button, Space } from "antd";

const HomePage: React.FC = () => {
  return (
    <div className="d-flex flex-column text-style">
      <Space direction="vertical" size={8}>
        <img src="./UofABanner.png" className="bannerStyle" alt="Banner" />
        <h1>MM802 - Mini Project</h1>
        <Button className="homePageButton" type="primary" href="/covid-cases">Covid Cases</Button>
        <Button className="homePageButton" type="primary" href="/treatments-and-vaccines">Treatments and Vaccines</Button>
        <Button className="homePageButton" type="primary" href="/Vaccines">Vaccines</Button>
        <Button className="homePageButton" type="primary" href="/health-info">Vaccine Coverage</Button>
        <Button className="homePageButton" type="primary" href="https://docs.google.com/document/d/11WB6BY0G19YKHv7wFfgzVgMeFPyhoawcrPpXn2iMfWw/edit?usp=sharing" target="_blank">Report Paper</Button>
      </Space>

      <p className="submission">Assignment submited by <br /> Chunyang Liu, Mingzhi Zhu</p>
    </div>
  );
};
export default HomePage;
