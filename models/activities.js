var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitiesSchema = mongoose.Schema({
    type: String,
    choices: [{
        title: String,
        counter: Number
    }],
    startTime: String,
    voteEndTime: String,
    chosenActivity: String,
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});


module.exports = mongoose.model('Activities', ActivitiesSchema);
