const User = require('../models/user')
const jwt = require('jsonwebtoken')

const SECRET = process.env.JWT_SECRET

async function signup(req, res) {
    const user = new User(req.body)
    try {
        await user.save()
        const token = createJWT(user)

        res.json({ token })
    } catch (err) {
        res.status(400).json(err)
    }
}

//helper functions
function createJWT(user) {
    return jwt.sign(
        { user },
        SECRET,
        { expiresIn: '24h' }
    )
}


module.exports = {
    signup
}