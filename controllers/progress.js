const User = require('../models/user')
const Checkpoint = require('../models/checkpoint')

async function create(req, res) {
    try {
        Checkpoint.findById(req.params.id)
        .then(checkpoint => {
            for (let i=0; i< checkpoint.categories.length; i++){
                //if an entry already exists for that day, overwrite it. otherwise, simply push progress to end of array
                const found = checkpoint.categories[i].scores.findIndex(el => {
                    return el.date.toISOString().slice(0,10) === req.body[i].date.toString()
                })
                if (found > 0) {
                    checkpoint.categories[i].scores.splice(found, 1, req.body[i])
                } else {
                    checkpoint.categories[i].scores.set(checkpoint.categories[i].scores.length, req.body[i])
                } 
            }
            checkpoint.save(function(err, checkpoint) {
                console.log(checkpoint.categories[0].scores)
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