import mongoose from 'mongoose';

const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.Mongo_Url)
        console.log('Database COnnected Successfully');
    }
    catch (error) {
        console.log(error);
        console.log('Error conneting Database')
    }
}

export default ConnectDB;