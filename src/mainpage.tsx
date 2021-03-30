import React from "react";
import {Divider,Typography} from "antd";
import './index.css';

const { Title, Paragraph, Text, Link } = Typography;

const MainPage: React.FC = () => {

  return (
    <div>      
      <Typography style={{marginLeft: 15}}>
        <Title>Introduction</Title>
        <Divider/>
        <Paragraph className="mainpara">
        The number of new coronavirus infections is currently on the rise, and the number of infections 
        in Canada is approaching one million. Vaccination plans in various countries around the world
         are proceeding in an orderly manner. In order to better focus on displaying information related
          to the new coronavirus. We have developed this new coronavirus information visualization platform.
        </Paragraph>
        <Title>Content</Title>
        <Divider/>
        <Title>Data</Title>
        <Divider/>
        <Title>Packages</Title>
        <Divider/>
        <div className="mainpara">
        <Title level={3}>React</Title>
        <Paragraph>
          <li>React is a JavaScript library for building user interfaces.</li>
          <li><Link href="https://reactjs.org/">React Document Website</Link></li>
          <li><Link href="https://github.com/facebook/react/">React Github</Link></li>
        </Paragraph>
        <Title level={3}>Ant Design</Title>
        <Paragraph>
          <li>A design system for enterprise-level products. Create an efficient and enjoyable work experience.</li>
          <li><Link href="https://ant.design/">Ant Design Website</Link></li>
          <li><Link href="https://github.com/ant-design/ant-design/">Ant Design Github</Link></li>
        </Paragraph>
        <Title level={3}>Recharts</Title>
        <Paragraph>
          <li>Re-designed charting library built with React and D3.</li>
          <li><Link href="https://recharts.org/en-US/">Rechart Website</Link></li>
          <li><Link href="https://github.com/recharts/recharts">Rechart Github</Link></li>
        </Paragraph>
        </div>
      </Typography>
    </div>
  );
}


export default MainPage;