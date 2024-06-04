import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionsTable = ({ month, search, page, perPage, setPage }) => {
    const [transactions, setTransactions] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await axios.get('http://localhost:1212/data/transactions', {
                    params: { month, search, page, perPage }
                });

                setTransactions(res.data.transactions);
                console.log(res)
                setTotal(res.data.total);
            }
            catch (error) {
                console.log('Error fetching', error)
            }
        };
        fetchTransactions();

    }, [month, search, page, perPage])

    return (
        <div className="container-fluid w-100 h-100 d-flex align-items-center">
            <div className="container d-flex flex-column justify-content-center align-items-center">
                <table className="table table-striped" border={1}>
                    <thead>
                        <tr>
                            <th scope="col" >Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Date of Sale</th>
                            <th scope="col">Category</th>
                            <th scope="col">Sold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction._id}>
                                <td>{transaction.title}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.price}</td>
                                <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.sold ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <button
                        className="btn btn-danger mx-2"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    >
                        Previous
                    </button>
                    <button
                        className="btn btn-primary mx-2"
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        Next
                    </button>
                </div>
                <p>
                    Page {page} of {Math.ceil(total / perPage)}
                </p>
            </div>
        </div>
    );
}

export default TransactionsTable;
