import React, { useState, useEffect, useCallback } from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';
import { readString } from 'react-papaparse';
import './App.css';

interface IPieData {
    name: string;
    value: number;
}

const TreatmentsAndVaccines: React.FC = () => {

    const [productCategory, setProductCategory] = useState<IPieData[]>([]);
    const [stageOfDevelopment, setStageOfDevelopment] = useState<IPieData[]>([]);

    const loadData = useCallback(async () => {
        const response = await fetch('Treatments and Vaccines.csv');
        const reader = response.body?.getReader();
        const result = await reader?.read();
        const decoder = new TextDecoder('utf-8');
        const csv = await decoder.decode(result?.value);
        const convertedCSV = readString(csv, { header: true, dynamicTyping: true });
        const results = convertedCSV.data;
        
        const tempCategory: any[] = [];
        results.forEach((r: any) => {
            if (!tempCategory.some(pc => pc.name === r.ProductCategory)) {
                if (r.ProductCategory !== undefined) {
                    tempCategory.push({ name: r.ProductCategory, value: 1 });
                }
            } else {
                let index = tempCategory.findIndex(pc => pc.name === r.ProductCategory);
                tempCategory[index].value += 1;
            }
        });
        setProductCategory(tempCategory);

        const tempStage: any[] = [];
        results.forEach((r: any) => {
            if (!tempStage.some(pc => pc.name === r.StageOfDevelopment)) {
                if (r.StageOfDevelopment !== undefined) {
                    tempStage.push({ name: r.StageOfDevelopment, value: 1 });
                }
            } else {
                let index = tempStage.findIndex(pc => pc.name === r.StageOfDevelopment);
                tempStage[index].value += 1;
            }
        });
        setStageOfDevelopment(tempStage);
    }, []);
    
    useEffect(() => {
        loadData();
    }, [loadData]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="container-fluid">
            <PieChart width={1400} height={800}>
                <Pie
                    dataKey="value"
                    data={productCategory}
                    cx="20%"
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
                <Pie
                    dataKey="value"
                    data={stageOfDevelopment}
                    cx="80%"
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
                <Tooltip/>
                <Legend/>
            </PieChart>
        </div>
    );

};

export default TreatmentsAndVaccines;