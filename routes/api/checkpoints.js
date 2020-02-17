const express = require('express')
const router = express.Router()
const checkpointCtrl = require('../../controllers/checkpoints.js')

router.get('/', checkpointCtrl.index)
router.post('/', checkpointCtrl.create)
router.delete('/:id', checkpointCtrl.delete)
router.put('/:id', checkpointCtrl.update)

module.exports = router