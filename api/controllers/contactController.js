const ContactModel = require('../models/ContactModel')

const getAllContactController = (req, res, next) => {
    ContactModel.find()
        .then(contacts => {
            res.status(200).json({
                message: "All Contacts",
                contacts
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Data finding error",
                error: err
            })
        })
}

const postNewContactController = (req, res, next) => {
    const contact = new ContactModel({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    })

    contact.save()
        .then(data => {
            res.status(201).json({
                message: "Added Successfully",
                contact: data
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Data saving error",
                error: err
            })
        })
}

const getSingleContact = (req, res, next) => {
    let id = req.params.id
    
    ContactModel.findById(id)
        .then(contact => {
            res.status(200).json({
                contact
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Error occured",
                error: err
            })
        })
}

const deleteContact = (req, res, next) => {
    let id = req.params.id
    ContactModel.findByIdAndRemove(id)
        .then(result => {
            res.json({
                message: "Contact Deleted",
                result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Error occured",
                error: err
            })
        })
}

const editContact = (req, res, next) => {
    let id = req.params.id

    let updatedContact = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    }

    ContactModel.findByIdAndUpdate(id, {$set: updatedContact})
        .then(contact => {
            res.json({
                message: "Updated",
                contact
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Error occured",
                error: err
            })
        })
}

module.exports = {
    getAllContactController,
    postNewContactController,
    getSingleContact,
    deleteContact,
    editContact
}