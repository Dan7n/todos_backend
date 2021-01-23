const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Todo", TodoSchema)