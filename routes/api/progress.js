const express = require('express')
const router = express.Router()
const progressCtrl = require('../../controllers/progress.js')

router.post('/:id/addProgress', progressCtrl.create)

module.exports = router