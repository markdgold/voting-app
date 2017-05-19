var express = require('express');
var Group = require('../models/group');
var User = require('../models/user');
var router = express.Router();

router.route('/')
    // Pretty sure we don't need a route to get ALL groups.  We should be
    // able to just render all the groups a user has based on the Group._id's
    // from their User schema.

// .get(function(req, res) {
//     Group.find(function(err, groups) {
//         if (err) return res.status(500).send(err);
//         res.send(groups);
//     });
// })

// Route to create a new Group
.post(function(req, res) {
    var userId = req.user.id;
    var groupName = req.body.name;

    Group.create({
        name: groupName,
        users: {
            id: userId,
            votes: 100,
            owner: true,
        }
    }, function(err, group) {
        if (err) return res.status(500).send(err);

        User.findByIdAndUpdate(userId, { userGroups: [group._id] }, function(err) {
            if (err) return res.status(500).send(err);
        });
        res.send(group);
    });
});

router.route('/:id')
    // Route to return an individual Group
    .get(function(req, res) {
        Group.findById(req.params.id, function(err, group) {
            if (err) return res.status(500).send(err);
            res.send(group);
        });
    })
    // Route to edit an individual Group
    .put(function(req, res) {
        Group.findByIdAndUpdate(req.params.id, req.body, function(err) {
            if (err) return res.status(500).send(err);
            res.send({ 'message': 'success' });
        });
    })
    // Route to delete an individual Group
    .delete(function(req, res) {
        Group.findByIdAndRemove(req.params.id, function(err) {
            if (err) return res.status(500).send(err);
            res.send({ 'message': 'success' });
        });
    });

module.exports = router;
