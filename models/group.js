var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    users: [{
        id: { type: Schema.Types.ObjectId, ref: 'User' },
        votes: Number,
        owner: Boolean
    }],
    activities: [{ type: Schema.Types.ObjectId, ref: 'Events' }]
});

module.exports = mongoose.model('Group', GroupsSchema);
