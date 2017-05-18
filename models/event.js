var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventsSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    choices: [{
        title: String,
        counter: Number,
        currentVotes: [{
            id: { type: Schema.Types.ObjectId, ref: 'User' },
            votesSpent: Number,
        }]
    }],
    startTime: String,
    voteEndTime: Date,
    chosenActivity: String,
    active: Boolean,
    users: [{
        id: { type: Schema.Types.ObjectId, ref: 'User' },
        votes: Number
    }],

});


module.exports = mongoose.model('Event', EventsSchema);
