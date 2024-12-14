
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const {userrouter} = require('./routers/users');
const {coursesrouter} = require('./routers/courses');
const {adminrouter} = require('./routers/admin');
const app = express()
app.use(express.json());
app.use('/user', userrouter);
app.use('/courses', coursesrouter);
app.use('/admin', adminrouter);

async function main(){
    await mongoose.connect(process.env.MONGO_URL);;
    console.log("Connected to MongoDB");
    app.listen(3000);
}

main();