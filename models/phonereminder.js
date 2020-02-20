const mongoose = require('mongoose')
const Schema = mongoose.Schema

const phonereminderSchema = new Schema({
    datetime: Number,
    phoneNum: String,
    checkpoint: {type: Schema.Types.ObjectId, ref: 'Checkpoint'},
})

module.exports = mongoose.model('PhoneReminder', phonereminderSchema, 'phone_reminders')