var mongoose = require('mongooose');
var Schema = mongoose.Schema;

var GroupsSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Users: [{
        id: { type: Schema.Types.ObjectId, ref: 'User' },
        votes: Number
    }],
    activities: [{ type: Schema.Types.ObjectId, ref: 'Activities' }]
});

module.exports = mongoose.model('Groups', GroupsSchema);
