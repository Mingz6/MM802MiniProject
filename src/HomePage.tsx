import * as React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, PageHeader} from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './index.css';
import Vaccines from "./Vaccines";
import CovidCases from "./CovidCases";
import TreatmentsAndVaccines from "./TreatmentsAndVaccines";
import HealthInfo from "./HealthInfo";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const HomePage: React.FC = (props) => {
  const [collapsed, setCollapsed] = React.useState<boolean>(false);

  const onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  return (
    <div className="container">
      <Layout>
      <Header className="site-layout" style={{ padding: 0}}>
      <div className="logo" style={{overflow: 'visible'}}>
            <img src="./UofABanner.png" className="logo"/>
          </div>
        </Header>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} theme="light" 
          style={{ overflow: 'visible', height: '100vh', position: 'fixed', left: 0,
        }}>
          
          <Menu defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to="/home"/>
              Home
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to="/covid-cases"/>
              Covid Case Count
            </Menu.Item>
            <Menu.Item key="3" icon={<FileOutlined />}>
            <Link to="/treatments-and-vaccines"/>
              Vaccines Pie Chart
            </Menu.Item>
            <Menu.Item key="4" icon={<FileOutlined />}>
            <Link to="/Vaccines"/>
              Vaccines Table
            </Menu.Item>
            <Menu.Item key="5" icon={<FileOutlined />}>
            <Link to="/health-info"/>
              Health Info
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: collapsed?80:200 }}>
          
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          </Content>
          <Footer style={{ textAlign: 'center' }}>University of Alberta MRC ©2021 <br/>Created by Chuyang L. and Mingzhi Z.</Footer>
        </Layout>
      </Layout>
      </Layout>
    </div>
  );
};
export default HomePage;
