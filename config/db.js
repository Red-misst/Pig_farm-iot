const express = require("express");
const mongoose = require("mongoose");

const  connectDb = ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
    }).then(()=>{
        console.log("Database connected Succesfully");
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = connectDb;