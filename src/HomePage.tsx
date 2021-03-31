/**
 * Home Page
 * The page control all component.
 * This component is only have the header, Footer and sider bar
 * It will choose the content (other component) base on which menu item be clicked.
 * UI render with Ant Design
 */
// Library
import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu} from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  TableOutlined,
  LineChartOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

// Style Files
import 'antd/dist/antd.css';
import './index.css';

// The content component to be refers
import Vaccines from "./Vaccines";
import CovidCases from "./CovidCases";
import TreatmentsAndVaccines from "./TreatmentsAndVaccines";
import HealthInfo from "./HealthInfo";
import MainPage from "./MainPage";

const { Header, Content, Footer, Sider } = Layout;

const HomePage: React.FC = (props) => {
  const [collapsed, setCollapsed] = React.useState<boolean>(false); // side bar shrink or not

  // onClick action, shrink or extend the bar
  const onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  return (
    <Router>
      <div className="container">
          <Header className="site-layout" style={{ padding: 0, position: 'fixed', zIndex: 1, width: '100%'}}>
              <img src="./UofABanner.png" alt="logo" className="logo"/>
          </Header>
        <Layout>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} theme="light" 
            style={{ overflow: 'visible', height: '100vh', position: 'fixed', left: 0, marginTop: 64
          }}>
            <Menu defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<DesktopOutlined />}>
                <Link to="/"/>
                Home
                </Menu.Item>
              <Menu.Item key="2" icon={<LineChartOutlined />}>
                <Link to='/CovidCases'/>
                Covid Case Count
              </Menu.Item>
              <Menu.Item key="3" icon={<PieChartOutlined />}>
                <Link to="/treatments-and-vaccines"/>
                Vaccines Pie Chart
              </Menu.Item>
              <Menu.Item key="4" icon={<TableOutlined />}>
                <Link to="/Vaccines"/>
                  Vaccines Table
              </Menu.Item>
              <Menu.Item key="5" icon={<AppstoreOutlined />}>
                <Link to="/health-info"/>
                  Vaccines Coverage
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout" style={{ marginLeft: collapsed?80:200, marginTop: 64}}>
            
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <Route exact path='/' component={MainPage}/>
              <Route exact path="/Vaccines" component={Vaccines} />
              <Route exact path="/CovidCases" component={CovidCases} />
              <Route exact path="/treatments-and-vaccines" component={TreatmentsAndVaccines} />
              <Route exact path="/health-info" component={HealthInfo} />
            </Content>
            <Footer style={{ textAlign: 'center' }}>University of Alberta MRC ©2021 <br/>Created by Chuyang L. and Mingzhi Z.</Footer>
          </Layout>
        </Layout>
      </div>
    </Router>
  );
};
export default HomePage;
