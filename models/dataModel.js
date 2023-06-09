const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
var dataSchema = new mongoose.Schema(
  {
    Parameter: {
      type: String,
      required: true,
    },
    data: [],
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Data", dataSchema);
