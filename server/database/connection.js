const mongoose = require('mongoose');


const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.Mongo_URI,{
            useNewUrlParser:true,
            UseUnifiedTopology:true
            // useCreateIndex:true
        })

        console.log(`mongodb Connected : ${conn.connection.host}`);

    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;