import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { readString } from 'react-papaparse';
import './App.css';

const CovidCases: React.FC = () => {

    const [cases, setCases] = useState<any[]>([]);

    const loadData = useCallback(async () => {
        const cases = await GetData();
        const filteredCases = cases.data.filter((c: any) => c.prname === 'Canada');
        setCases(filteredCases);
    }, []);
    
    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <div className="container-fluid">
            <LineChart
                width={1200}
                height={600}
                data={cases}
                className="height-fix"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="numtotal" stroke="blue" />
                <Line type="monotone" dataKey="numdeaths" stroke="red" />
            </LineChart>
        </div>
    );

    async function GetData() {
        const data = readString(await fetchCsv(), { header: true, dynamicTyping: true });
        // console.log(data);
        return data;
    }

    async function fetchCsv() {
        const response = await fetch('covid19-download.csv');
        const reader = response.body?.getReader();
        const result = await reader?.read();
        const decoder = new TextDecoder('utf-8');
        const csv = await decoder.decode(result?.value);
        // console.log('csv', csv);
        return csv;
    }
}

export default CovidCases;