var mongoose = require('mongooose');
var Schema = mongoose.Schema;

var GroupsSchema = mongoose.Schema({
    Name: String,
    Users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    activities: [{ type: Schema.Types.ObjectId, ref: 'Activities' }]
});

module.exports = mongoose.model('Groups', GroupsSchema);
