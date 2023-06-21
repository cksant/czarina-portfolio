let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Contacts Model
let Contacts = require('../models/contacts');
const req = require('express/lib/request');

// Get Route for the Contacts page - READ Operation
router.get('/',async(req, res, next)=>{
    try {
        let contactsList = await Contacts.find();
        console.log(contactsList);
        res.render('businesscontacts', {title: 'Busines Contacts', ContactsList : contactsList})
    } catch (err){
        console.log(err);
    }
});

// Get Route for displaying the Edit page - UPDATE Operation
router.get('/edit/:id', async(req, res, next) => {
    let id = req.params.id;

    try {
        let contactToEdit = await Contacts.findById(id);
        res.render('edit', {title: 'Edit Contact', Contact: contactToEdit})
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// Post Route for processing the Edit page - UPDATE Operation
router.post('/edit/:id', async(req, res, next) => {
    let id = req.params.id;

    let updatedContact = {
        'name': req.body.name,
        'number': req.body.number,
        'email': req.body.email
    }

    try {
        await Contacts.updateOne({_id:id}, updatedContact);
        res.redirect('/contacts');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


// Get to perform Deletion - Delete Operation
router.get('/delete/:id', async(req, res, next) => {
    let id = req.params.id;

    try {
        await Contacts.findByIdAndRemove(id);
        res.redirect('/contacts');
        console.log('complete');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;