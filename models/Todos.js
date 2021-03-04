const mongoose = require("mongoose");
const User = require("./User.js");

const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Todo", TodoSchema);
