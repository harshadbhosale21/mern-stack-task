import React, { useState } from 'react';
import TransactionsTable from './TransactionsTable';
import Statistics from './Statistics';
import BarChart from './BarChart';
import BarChartData from './BarChart';

const TransactionsData = () => {
    const [month, setMonth] = useState('03');
    const [monthName, setMonthName] = useState('March')
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const setMonthState = (e) => {
        setMonth(e.target.value);
        const setSelectedMonth = e.target.options[e.target.selectedIndex].text;
        setMonthName(setSelectedMonth)
    }

    return (
        <div id='transactions' className='container-fluid'>
            <div className="container my-4 d-flex flex-column justify-content-center align-items-center">
                <h1>Transactions</h1>
                <div className="d-flex justify-content-between my-2 w-100">
                    <label>
                        Select Month:
                        <select className='mx-2' value={month} onChange={(e) => setMonthState(e)}>
                            <option value="01" name='January'>January</option>
                            <option value="02">February</option>
                            <option value="03">March</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                    </label>
                    <label>
                        Search Transactions:
                        <input className='mx-2' type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </label>
                </div>
            </div>

            <div className="container">

                <TransactionsTable
                    month={month}
                    search={search}
                    page={page}
                    perPage={perPage}
                    setPage={setPage}
                />
            </div>
            <div className="container">
                <Statistics month={month} monthName={monthName} />
            </div>
            <div className="container">
                <BarChartData month={month} monthName={monthName} />
            </div>
        </div>
    );
};

export default TransactionsData;
