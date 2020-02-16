const mongoose = require('mongoose')
const Schema = mongoose.Schema

const resultSchema = new Schema({
    result: {
        type: String,
        required: true
    },
    date: Date,
    note: String
})

const goalSchema = new Schema({
    goal: {
        type: String,
        required: true
    },
    plan: String,
    motivation: String
})

const scoreSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    score: Number,
    notes: String
})

const challengeSchema = new Schema({
    challenge: {
        type: String,
        required: true
    },
    num: {
        type: Number,
        default: 1,
        required: true
    },
    results: [resultSchema]
})

const categorySchema = new Schema({
    categoryName: {
        type: String,
        required: true
    },
    positives: String,
    negatives: String,
    goals: [goalSchema],
    scores: [scoreSchema],
    challenges: [challengeSchema]
})

const checkpointSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    theme: String,
    reminders: {
        type: Number,
        default: -1,
    },
    reminderType: String,
    nextReminder: Date,
    user: [{type: Schema.Types.ObjectId, ref: 'User'}],
    categories: [categorySchema]
}, {
    timestamps: true
})
module.exports = mongoose.model('Checkpoint', checkpointSchema)