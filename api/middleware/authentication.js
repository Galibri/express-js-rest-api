const jwt = require('jsonwebtoken')

const Authenticate = (req, res, next) => {

    try {
        
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'ANYTHING')

        req.user = decode
        next()

    } catch(error) {
        res.json({
            message: "Authentication Failed"
        })
    }
}

module.exports = Authenticate