var express = require('express');
var EventDb = require('../models/event');
var router = express.Router();

router.route('/')
    // Pretty sure we don't need a route to get ALL events.  We should be
    // able to just render all the events a gropu has based on the Event._id's
    // from the Group schema.

// .get(function(req, res) {
//     EventDb.find(function(err, events) {
//         if (err) return res.status(500).send(err);
//         res.send(events);
//     });
// })

// Route to create a new Event
.post(function(req, res) {
    EventDb.create(req.body, function(err, event) {
        if (err) return res.status(500).send(err);
        res.send(event);
    });
});

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
