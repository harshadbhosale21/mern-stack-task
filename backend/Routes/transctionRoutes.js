import express from 'express';
import { getBarChart, getCombinedData, getPieChart, getStatistics, listTransactions, transactionController } from '../Controller/transactionCOntroller.js';

const router = express.Router();

router.get('/initialize', transactionController);

router.get('/transactions', listTransactions);

router.get('/statistics', getStatistics);

router.get('/barchart', getBarChart);

router.get('/piechart', getPieChart);

router.get('/combined', getCombinedData);

export default router;

