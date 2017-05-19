var express = require('express');
var Event = require('../models/event');
var router = express.Router();

router.route('/')
    .post(function(req, res) {
        Event.create(req.body, function(err, event) {
            if (err) return res.status(500).send(err);
            res.send(event);
        });
    });


router.route('/:id')
    // Route to return an individual Event
    .get(function(req, res) {
        Event.findById(req.params.id, function(err, event) {
            if (err) return res.status(500).send(err);
            res.send(event);
        });
    })
    // Route to edit an individual Event
    .put(function(req, res) {
        Event.findByIdAndUpdate(req.params.id, req.body, function(err) {
            if (err) return res.status(500).send(err);
            res.send({ 'message': 'success' });
        });
    })
    // Route to delete an individual Event
    .delete(function(req, res) {
        Event.findByIdAndRemove(req.params.id, function(err) {
            if (err) return res.status(500).send(err);
            res.send({ 'message': 'success' });
        });
    });

module.exports = router;
