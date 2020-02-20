const User = require('../models/user')
const Checkpoint = require('../models/checkpoint')
const EmailReminder = require('../models/emailreminder')

async function challengeResult(req, res) {
    try {
        Checkpoint.findById(req.params.id)
        .then(checkpoint => {
            checkpoint.categories[req.body.categoryId].challenges[req.body.challengeId].results.set(checkpoint.categories[req.body.categoryId].challenges[req.body.challengeId].results.length, req.body.formData)
            checkpoint.save(function(err, checkpoint) {
                if (err) res.status(400).json({message: err})
                res.status(200).json(checkpoint)
            })
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({message: err})
    }
}

async function create(req, res) {
    try {
        const checkpoint = await Checkpoint.create(req.body)
        //get array of dates for reminders
        if(req.body.reminderType === 'Email') {
            const startDate = new Date(req.body.startDate).getTime()
            const endDate = new Date(req.body.endDate).getTime()
            let time = startDate;
            while (time < endDate){
                time += 1000*60*60*24*7
                await EmailReminder.create({
                    datetime: time,
                    email: req.user.email,
                    checkpoint: checkpoint._id
                })
            }
        }
        res.status(201).json(checkpoint)
    } catch (err) {
        console.log(err)
        res.status(401).json({message: err})
    }
}

async function deleteCheckpoint(req, res) {
    try {
        const deletedCheckpoint = await Checkpoint.findByIdAndDelete(req.params.id)
        //delete any reminders associated with that checkpoint
        await EmailReminder.deleteMany({ checkpoint: req.params.id, function (err) {
            res.status(400).json({message: 'err'})
        } })
        res.status(200).json(deletedCheckpoint)
    } catch (err) {
        res.status(400).json({message: 'err'})
    }
}

async function index(req, res) {
    try {
        const user = req.user._id
        const checkpoints = await Checkpoint.find({ user:  user })
        res.status(200).json(checkpoints)
    } catch (err) {
        res.status(400).json({message: err})
    }
}

async function update(req, res) {
    try {
        const updatedCheckpoint = await Checkpoint.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(updatedCheckpoint)
    } catch (err) {
        res.status(400).json({message: err})
    }
}
module.exports = {
    create,
    delete: deleteCheckpoint,
    index,
    update,
    challengeResult
}