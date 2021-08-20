const express = require("express");
require("dotenv").config(); //for accessing process.env variables
require("./config/db").connect();
const cors=require('cors');

const app = express();
app.use(express.json());

//for cross origin issue resolve
app.use(cors());


const customerRoute=require('./routes/customer'); //routes for customer endpoint
const ownerRoute=require('./routes/owner'); //routes for owner endpoint

app.use('/customer',customerRoute);
app.use('/owner',ownerRoute);

module.exports = app; 