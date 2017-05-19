var express = require('express');
var EventDb = require('../models/event');
var Group = require('../models/group');
var User = require('../models/user');
var router = express.Router();

router.route('/')
    // Route to create a new group and add that group to the current user
    // userGroups
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
            User.findByIdAndUpdate(userId, { $push: { userGroups: [group._id] } }, function(err) {
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

router.route('/:id/new')
    .post(function(req, res) {
        var userId = req.user.id;
        var groupId = req.params.id;

        EventDb.create({
            type: req.body.type,
            startTime: req.body.startTime,
            voteEndTime: req.body.voteEndTime,
            choices: {
                title: req.body.choices.title
            },
            active: true,
            users: [{
                id: userId
            }]
        }, function(err, event) {
            if (err) return res.status(500).send(err);
            Group.findByIdAndUpdate(groupId, { $push: { activities: [event._id] } }, function(err) {
                if (err) return res.status(500).send(err);
            });
            User.findByIdAndUpdate(userId, { $push: { userEvents: [event._id] } }, function(err) {
                if (err) return res.status(500).send(err);
            });
            res.send(event);
        });
    });


module.exports = router;
