var mongoose = require('mongooose');
var Schema = mongoose.Schema;

var GroupsSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Users: [{
        id: { type: Schema.Types.ObjectId, ref: 'User' },
        votes: Number,
        owner: Boolean
    }],
    activities: [{ type: Schema.Types.ObjectId, ref: 'Events' }]
});

module.exports = mongoose.model('Groups', GroupsSchema);
