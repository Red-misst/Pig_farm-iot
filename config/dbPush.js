const express = require("express");
const data = require("../models/dataModel");

const dbCreate = () => {
  // Create a new document in the collection "Data"
  data.create({
    Parameter: "Noise",
    data: [""],
  });
};

const dbPush =async (_noise) => {
  console.log(_noise);
  // Find the document by ID and push data to the array
  const newData = await data.findByIdAndUpdate(
    process.env.DATA_ID,
    { $push: { data: _noise } },
    { new: true }
  );
  console.log(newData);
};

module.exports = { dbPush, dbCreate };
