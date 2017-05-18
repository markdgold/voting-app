var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitiesSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    choices: [{
        title: String,
        counter: Number
    }],
    startTime: String,
    voteEndTime: String,
    chosenActivity: String,
    active: Boolean,
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]

});


module.exports = mongoose.model('Activities', ActivitiesSchema);
