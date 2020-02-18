const User = require('../models/user')
const Checkpoint = require('../models/checkpoint')

async function create(req, res) {
    try {
        Checkpoint.findById(req.params.id)
        .then(checkpoint => {
            for (let i=0; i< checkpoint.categories.length; i++){
                checkpoint.categories[i].scores.set(checkpoint.categories[i].scores.length, req.body[i])
            }
            checkpoint.save(function(err, checkpoint) {
                if (err) res.status(400).json({message: err})
                res.status(200).json(checkpoint)
            })
        })
    }
    catch (err) {
        res.status(400).json({message: err})
    }
}

module.exports = {
    create
}