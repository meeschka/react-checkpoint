const mongoose = require('mongoose')
const Schema = mongoose.Schema

const emailreminderSchema = new Schema({
    datetime: Number,
    email: String,
    checkpoint: {type: Schema.Types.ObjectId, ref: 'Checkpoint'},
})

module.exports = mongoose.model('emailreminders', emailreminderSchema)