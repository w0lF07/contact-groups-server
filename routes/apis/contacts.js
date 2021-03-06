var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Contact = require('../../models/contacts.js');

router.get('/', function(req, res, next) {
    Contact.findAsync()
    .then(function(contacts) {
        res.send(contacts);
    })
    .catch(next)
    .error(console.error);
});

router.post('/', function(req, res, next) {
    var contact = new Contact({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    });
    contact.saveAsync()
    .then(function(contact) {
        res.send(contact);
    })
    .catch(next)
    .error(console.error);
});

router.get('/:id', function(req, res, next) {
    Contact.findOneAsync({ _id: req.params.id })
    .then(function(contact) {
        res.send(contact);
    })
    .catch(next)
    .error(console.error);
});

router.put('/:id', function(req, res, next) {
    Contact.updateAsync({ _id: req.params.id }, req.body)
    .then(function(contact) {
        res.send(contact);
    })
    .catch(next)
    .error(console.error);
});

router.delete('/:id', function(req, res, next) {
    Contact.findByIdAndRemoveAsync(req.params.id)
    .then(function(contact) {
        res.send(contact);
    })
    .catch(next)
    .error(console.error);
});

module.exports = router;
