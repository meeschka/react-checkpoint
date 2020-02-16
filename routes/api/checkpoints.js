const express = require('express')
const router = express.Router()
const checkpointCtrl = require('../../controllers/checkpoints.js')

router.post('/', checkpointCtrl.create)

module.exports = router