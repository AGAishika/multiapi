const mongoose = require('mongoose')

const connectDB=()=>{
    //For local DB
    return mongoose.connect(process.env.LIVE_URL)

    // For cloud DB
    // return mongoose.connect()

    .then(()=> {
        console.log("connected successfully")
    })
    .catch((error)=>{
        console.log(error)
    })
}
module.exports = connectDB;