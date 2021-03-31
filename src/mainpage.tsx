/**
 * HomePage Component 
 * shows the introduction and information about the website
 * Pure Html
 */
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
        <Paragraph className="mainpara" style={{marginRight: 250}}>
        The number of new coronavirus infections is currently on the rise, and the number of infections 
        in Canada is approaching one million. Vaccination plans in various countries around the world
         are proceeding in an orderly manner. In order to better focus on displaying information related
          to the new coronavirus. We have developed this new coronavirus information visualization platform.
        </Paragraph>
        <Title>Content</Title>
        <Divider/>
        <div className="mainpara">
          <Paragraph style={{marginRight: 250}}>
          The data display of this website is mainly divided into 4 parts. Basic data: A line chart of the
           number of new coronavirus infections and deaths over time. Pie chart based on vaccine type and 
           development progress. The form of vaccines introduced in detail. You can filter the vaccines in 
           the form based on the type and development progress. Finally, there is a chart showing the 
           progress of vaccination in various provinces. For more detail, you can view at this 
           <Link href="https://docs.google.com/document/d/11WB6BY0G19YKHv7wFfgzVgMeFPyhoawcrPpXn2iMfWw/edit?usp=sharing"> document</Link>.
          </Paragraph>
        </div>
        
        <Title>Data</Title>
        <Divider/>
        <div className="mainpara">
          <Title level={4}>Covid Case Count</Title>
          <Paragraph>
            <li>The Covid case count <Link href="https://ourworldindata.org/coronavirus-source-data">data</Link> relies on data from Johns Hopkins University</li>
          </Paragraph>
          <Title level={4}>Vaccines</Title>
          <Paragraph>
            <li>The vaccines <Link href="https://covid-19tracker.milkeninstitute.org/#vaccines_intro">data</Link> from Milken Institute and update by ourself.</li>          
          </Paragraph>
          <Title level={4}>Vaccines Coverage</Title>
          <Paragraph>
            <li>The vaccines coverage <Link href="https://health-infobase.canada.ca/covid-19/vaccination-coverage/">Data Source</Link> from Canada Government.</li>          
          </Paragraph>
          <br/>
          <Paragraph>For more type of data, you can find it at <Link href="https://mdl.library.utoronto.ca/covid-19/data">University of Toronto Libraries</Link>.</Paragraph>
        </div>
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