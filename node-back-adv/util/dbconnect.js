
// Connecting the database of mongoose
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('DB connected'))
.catch((error)=> console.log("Error occured"))