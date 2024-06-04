import axios from 'axios';
import Transaction from '../Model/transactionModel.js';

export const transactionController = async (req, res) => {
    try {
        const url = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';
        const response = await axios.get(url);
        const data = response.data;

        await Transaction.deleteMany({});

        await Transaction.insertMany(data.map(item => ({
            title: item.title,
            description: item.description,
            price: item.price,
            category: item.category,
            dateOfSale: new Date(item.dateOfSale),
            sold: item.sold
        })));

        res.json({
            message: 'Data initialized successfully',
            data
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal server error'
        })
    }
}

export const listTransactions = async (req, res) => {
    try {
        const { page = 1, perPage = 10, search = '', month } = req.query;
        const query = {};

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { price: { $regex: search, $options: 'i' } },
            ];
        }

        if (month) {
            query.dateOfSale = { $gte: new Date(`2021-${month}-01`), $lt: new Date(`2022-${parseInt(month) + 1}-01`) };
        }

        console.log('Query:', query);

        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(parseInt(perPage));

        const total = await Transaction.countDocuments(query);

        console.log('Transactions:', transactions);

        res.json({ total, page, perPage, transactions })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' })
    }

};

export const getStatistics = async (req, res) => {
    try {
        const { month } = req.query;
        const query = {
            dateOfSale: { $gte: new Date(`2021-${month}-01`), $lt: new Date(`2022-${parseInt(month) + 1}-01`) }
        };

        const totalSales = await Transaction.aggregate([
            { $match: query },
            { $group: { _id: null, total: { $sum: '$price' } } }
        ]);
        const soldItems = await Transaction.countDocuments({ ...query, sold: true });
        const unsoldItems = await Transaction.countDocuments({ ...query, sold: false });

        res.json({
            totalSales: totalSales[0] ? totalSales[0].total : 0,
            soldItems,
            unsoldItems
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const getBarChart = async (req, res) => {
    try {
        const { month } = req.query;
        const query = {
            dateOfSale: { $gte: new Date(`2021-${month}-01`), $lt: new Date(`2022-${parseInt(month) + 1}-01`) }
        };

        const ranges = [
            { $gte: 0, $lte: 100 },
            { $gte: 101, $lte: 200 },
            { $gte: 301, $lte: 400 },
            { $gte: 401, $lte: 500 },
            { $gte: 501, $lte: 600 },
            { $gte: 601, $lte: 700 },
            { $gte: 701, $lte: 800 },
            { $gte: 801, $lte: 900 },
            { $gte: 901 },
        ];

        const barChart = await Promise.all(ranges.map(async range => {
            const count = await Transaction.countDocuments({
                ...query,
                price: range.$gte && range.$lte ? { $gte: range.$gte, $lte: range.$lte } : { $gte: range.$gte }
            });
            return { range: `${range.$gte}${range.$lte ? '-' + range.$lte : '+'}`, count };
        }));

        res.json(barChart)

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const getPieChart = async (req, res) => {
    try {
        const { month } = req.query;
        const query = {
            dateOfSale: { $gte: new Date(`2021-${month}-01`), $lt: new Date(`2022-${parseInt(month) + 1}-01`) }
        };

        const pieChart = await Transaction.aggregate([
            { $match: query },
            { $group: { _id: '$catgory', count: { $sum: 1 } } }
        ]);

        res.json(pieChart);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal Srever Error'
        })
    }
};

export const getCombinedData = async (req, res) => {
    try {
        const statistics = await getStatistics(req, res);
        const barChart = await getBarChart(req, res);
        const pieChart = await getPieChart(req, res);

        res.json({ statistics, barChart, pieChart })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal Srever Error'
        })
    }
}