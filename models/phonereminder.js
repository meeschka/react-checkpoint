const mongoose = require('mongoose')
const Schema = mongoose.Schema

const phonereminderSchema = new Schema({
    datetime: Number,
    phoneNum: Number,
    checkpoint: {type: Schema.Types.ObjectId, ref: 'Checkpoint'},
})

module.exports = mongoose.model('phonereminders', phonereminderSchema)