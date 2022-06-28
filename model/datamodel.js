const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  totalUpdates: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Items", itemSchema);
