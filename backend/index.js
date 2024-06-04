import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import ConnectDB from './db.js';
import transactionRoutes from './Routes/transctionRoutes.js'
dotenv.config();
const app = express();

app.use(bodyParser.json());

ConnectDB();

app.use(express.json());
app.use(cors())


app.use('/data', transactionRoutes)


const PORT = process.env.PORT || 1212;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})