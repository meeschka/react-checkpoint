const User = require('../models/user')
const Checkpoint = require('../models/checkpoint')

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
        res.status(201).json(checkpoint)
    } catch (err) {
        console.log(err)
        res.status(401).json({message: err})
    }
}

async function deleteCheckpoint(req, res) {
    try {
        const deletedCheckpoint = await Checkpoint.findByIdAndDelete(req.params.id)
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