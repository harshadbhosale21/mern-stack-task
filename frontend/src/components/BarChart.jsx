import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartData = ({ monthName, month }) => {

    const [chartData, setChartdata] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:1212/data/barchart', {
                    params: { month }
                });

                const data = res.data;
                setChartdata(data);
                console.log(data)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [month])


    return (
        <>
            <div id='bar' className="container py-3 d-flex flex-column justify-contnet-center align-items-center">
                <h1 className='fw-bold text-primary'>Bar Chart</h1>
                <h3 className="my-2 fw-bold">{monthName}</h3>
            </div>
            <div className="container d-flex flex-column justify-content-center align-items-center">
                <ResponsiveContainer width="100%" height="100%" />
                <BarChart
                    width={500}
                    height={300}
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                </BarChart>
            </div>
        </>
    )
}

export default BarChartData;



