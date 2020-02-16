const express = require('express')
const router = express.Router()
const checkpointCtrl = require('../../controllers/checkpoints.js')

router.get('/', checkpointCtrl.index)
router.post('/', checkpointCtrl.create)

module.exports = router