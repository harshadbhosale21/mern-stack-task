import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Statistics = ({ month, monthName }) => {
    const [stats, setStats] = useState([]);
    useEffect(() => {
        const fetchStats = async (req, res) => {
            try {

                res = await axios.get('http://localhost:1212/data/statistics', {
                    params: { month }
                });

                setStats(res.data)
                console.log(res)
            }
            catch (error) {

                console.log(error)
            }

        }

        fetchStats();

    }, [month])
    return (

        <>
            <div id='stats' className="container py-3 d-flex flex-column justify-contnet-center align-items-center">
                <h1 className='fw-bold text-primary'>Statistics</h1>
                <h3 className="my-2 fw-bold">{monthName}</h3>
            </div>
            <div className=" stats-cont container w-100 my-3 d-flex justify-content-center align-items-center">
                <div className="w-50 h-75 bg-warning rounded-3 d-flex flex-column justify-content-center align-items-center">
                    <h4 className='fw-bold py-3'><span>Total Sales:</span>  {stats.totalSales}</h4>
                    <h4 className='fw-bold py-3'><span>Sold Items:</span>  {stats.soldItems}</h4>
                    <h4 className='fw-bold py-3'><span>Unsold Items:</span>  {stats.unsoldItems}</h4>
                </div>
            </div>

        </>
    )
}

export default Statistics
