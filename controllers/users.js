var express = require('express');
var User = require('../models/user');
var router = express.Router();


// Route to create a new user
router.post('/', function(req, res) {
    console.log(req.body)
    User.create(req.body, function(err, user) {
        if (err) return res.status(500).send(err);
        res.send(user);
    });
});

router.route('/:id')
    // Route to return an individual user (profile show)
    .get(function(req, res) {
        User.findById(req.params.id, function(err, user) {
            if (err) return res.status(500).send(err);
            res.send(user);
        });
    })
    // Route to edit an individual user (profile edit)
    .put(function(req, res) {
        User.findByIdAndUpdate(req.params.id, req.body, function(err) {
            if (err) return res.status(500).send(err);
            res.send({ 'message': 'success' });
        });
    })
    // Route to delete an individual user (profile delete)
    .delete(function(req, res) {
        User.findByIdAndRemove(req.params.id, function(err) {
            if (err) return res.status(500).send(err);
            res.send({ 'message': 'success' });
        });
    });

module.exports = router;
