const User = require('../models/user')
const Checkpoint = require('../models/checkpoint')

async function create(req, res){
    console.log(req.user)
    console.log(req.body)
    try {
        const checkpoint = await Checkpoint.create(req.body)
        res.status(201).json(checkpoint)
    } catch (err) {
        res.status(401).json({message: err})
    }
}

module.exports = {
    create
}