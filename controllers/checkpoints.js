const User = require('../models/user')
const Checkpoint = require('../models/checkpoint')

async function create(req, res) {
    try {
        const checkpoint = await Checkpoint.create(req.body)
        res.status(201).json(checkpoint)
    } catch (err) {
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

module.exports = {
    create,
    delete: deleteCheckpoint,
    index
}