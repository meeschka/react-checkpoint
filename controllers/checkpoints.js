const User = require('../models/user')
const Checkpoint = require('../models/checkpoint')
const PhoneReminder = require('../models/phonereminder')

async function challengeResult(req, res) {
    try {
        Checkpoint.findById(req.params.id)
        .then(checkpoint => {
            if (checkpoint.user[0].toString === req.user._id.toString()) res.status(404).json({message: 'Not authorized'})
            checkpoint.categories[req.body.categoryId].challenges[req.body.challengeId].results.set(checkpoint.categories[req.body.categoryId].challenges[req.body.challengeId].results.length, req.body.formData)
            checkpoint.save(function(err, checkpoint) {
                if (err) throw('Database error')
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
        //get array of dates for reminders, then create those reminder objects
        if(req.body.reminderType === 'Text') {
            let startDate = new Date(req.body.startDate).getTime()
            const now = new Date().getTime()
            startDate = startDate > now ? startDate : now
            const endDate = new Date(req.body.endDate).getTime()
            let time = startDate;
            while (time < endDate){
                time += 1000*60*60*24*7
                if (req.body.reminderNum) {
                    await PhoneReminder.create({
                        datetime: time,
                        phoneNum: req.body.reminderNum,
                        checkpoint: checkpoint._id
                    })
                    .then(res=> console.log(res))
                } 
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
        await PhoneReminder.deleteMany({ checkpoint: req.params.id, function (err) {
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
        //if changed to no reminders, remove from reminder queue. If text reminders added, add reminders to queue
        const oldCheckpoint = await Checkpoint.findById(req.params.id)
        if (oldCheckpoint.user[0].toString === req.user._id.toString()) {
            throw('Not authorized')
        }
        if (req.body.reminderType === 'None' && oldCheckpoint.reminderType === 'Text') {
            await PhoneReminder.deleteMany({ checkpoint: req.params.id, function (err) {
                if (err) throw('Database error')
            } })
        } else if (req.body.reminderType === 'Text' && oldCheckpoint.reminderType === 'None') {
            let startDate = new Date(req.body.startDate).getTime()
            const now = new Date().getTime()
            startDate = startDate > now ? startDate : now
            const endDate = new Date(req.body.endDate).getTime()
            let time = startDate;
            while (time < endDate){
                time += 1000*60*60*24*7
                if (req.body.reminderNum) {
                    await PhoneReminder.create({
                        datetime: time,
                        phoneNum: req.body.reminderNum,
                        checkpoint: oldCheckpoint._id
                    })
                } 
            }
        }
        //update checkpoint
        const updatedCheckpoint = await Checkpoint.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(updatedCheckpoint)
    } catch (err) {
        console.log(err)
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