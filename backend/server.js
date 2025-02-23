const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/classes', require('./routes/classRoutes'));
app.use('/api/fees', require('./routes/feeRoutes'));
app.use('/api/income', require('./routes/incomeRoutes'));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

