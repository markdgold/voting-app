var express = require('express');
var EventDb = require('../models/event');
var router = express.Router();

router.route('/:id')
    // Route to return an individual Event
    .get(function(req, res) {
        EventDb.findById(req.params.id, function(err, event) {
            if (err) return res.status(500).send(err);
            res.send(event);
        });
    })
    // Route to edit an individual Event
    .put(function(req, res) {
        EventDb.findByIdAndUpdate(req.params.id, req.body, function(err) {
            if (err) return res.status(500).send(err);
            res.send({ 'message': 'success' });
        });
    })
    // Route to delete an individual Event
    .delete(function(req, res) {
        EventDb.findByIdAndRemove(req.params.id, function(err) {
            if (err) return res.status(500).send(err);
            res.send({ 'message': 'success' });
        });
    });

module.exports = router;
