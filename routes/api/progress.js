const express = require('express')
const router = express.Router()
const progressCtrl = require('../../controllers/progress.js')

router.post('/:id/addProgress', checkAuth, progressCtrl.create)

module.exports = router

//helper function
function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
  }