const express = require('express')
const router = express.Router()
const checkpointCtrl = require('../../controllers/checkpoints.js')

router.get('/', checkpointCtrl.index)
router.post('/', checkAuth, checkpointCtrl.create)
router.delete('/:id', checkAuth, checkpointCtrl.delete)
router.put('/:id', checkAuth, checkpointCtrl.update)
router.post('/:id/challenge', checkAuth, checkpointCtrl.challengeResult)

module.exports = router

//helper function
function checkAuth(req, res, next) {
  console.log(req.user)
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
  }