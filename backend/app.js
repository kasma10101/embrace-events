const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const paymentRoute = require('./routes/paymentRoute');
const tiicketRoute = require('./routes/ticketRoute');
const blogRoute = require('./routes/blogRoute')
const adminRoute = require('./routes/adminRoute')
const transactionRoute = require('./routes/transactionRoute')
const cookieParser = require('cookie-parser')

const app = express();

require("dotenv").config()

//middleware
app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(bodyParser.json());
app.use(cookieParser())

app.use(express.static('Images'))
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//routes
app.use('/api/payment', paymentRoute);
app.use('/api/tickets', tiicketRoute);
app.use('/api/blogs', blogRoute)
app.use('/api/admin', adminRoute)
app.use('/api/payment', paymentRoute);
app.use('/api/transactions', transactionRoute);


const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI) 
.then(() => {
    console.log('connected to db');
    app.listen(port, () => console.log(`server started on port ${port}`));
}).catch(err => console.log(err));