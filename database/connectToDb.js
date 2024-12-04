const mongoose = require('mongoose');

const connectToDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connected to mongodb successfully');
    } catch (error) {
        console.error('some error occured while connecting to mongodb')
    }
};

module.exports = connectToDb;