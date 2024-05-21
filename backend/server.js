const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const paymentRoute = require('./routes/paymentRoute');
const tiicketRoute = require('./routes/ticketRoute');
const blogRoute = require('./routes/blogRoute')
const adminRoute = require('./routes/adminRoute')
const cookieParser = require('cookie-parser')

const app = express();

//middleware
app.use(express.json());
app.use(cors(
    {
        origin: ['http://localhost:3000'], 
        credentials: true
    }
));
app.use(express.static('Images'))
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())

//blog images

//routes
app.get('/', (req, res) => {
    res.send('Home page');
});
//routes
app.use('/api/payment', paymentRoute);
app.use('/api/tickets', tiicketRoute);
app.use('/api/blogs', blogRoute)
app.use('/api/admin', adminRoute)



const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI) 
.then(() => {
    console.log('connected to db');
    app.listen(port, () => console.log(`server started on port ${port}`));
}).catch(err => console.log(err));
