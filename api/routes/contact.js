const express = require('express')
const router = express.Router()
const contactController = require('../controllers/contactController')
const Authenticate = require('../middleware/authentication')


//Get
router.get('/', contactController.getAllContactController)

//Post
router.post('/', Authenticate, contactController.postNewContactController)

//Single get
router.get('/:id', contactController.getSingleContact)

//Single put
router.put('/:id', contactController.editContact)

//Single delete
router.delete('/:id', contactController.deleteContact)

module.exports = router
