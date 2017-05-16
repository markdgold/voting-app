var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String
        //edit as needed
});

module.exports = mongoose.model('Item', ItemSchema);
