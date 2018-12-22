const bcrypt = require('bcrypt')
const userModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')

const registerController = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
            res.json({
                error: err
            })
        }

        let user = new userModel({
            email: req.body.email,
            password: hash
        })
        user.save()
            .then(result => {
                res.status(201).json({
                    message: 'User Created',
                    user: result
                })
            })
            .catch(err => {
                res.json({
                    error
                })
            })
    })
}

const loginUser = (req, res, next) => {
    let email = req.body.email
    let password = req.body.password

    userModel.findOne({email})
        .then(user => {
            if(user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err) {
                        res.json({
                            message: "Error Occured"
                        })
                    }

                    if(result) {
                        let token = jwt.sign({email: user.email, _id: user._id}, 'ANYTHING', {expiresIn: '2h'})
                        
                        res.json({
                            message: "Successfully Logged In",
                            token
                        })
                    } else {
                        res.json({
                            message: "Login Failed, password doesn't mach"
                        })
                    }
                } )
            } else {
                res.json({
                    message: "User doesn't exist"
                })
            }
        })
}

const getAllUser = (req, res, next) => {
    userModel.find()
        .then(users => {
            res.status(200).json({
                message: "All users",
                users
            })
        })
        .catch(err => {
            res.json({
                error: err
            })
        })
}

module.exports = {
    registerController,
    getAllUser,
    loginUser
}