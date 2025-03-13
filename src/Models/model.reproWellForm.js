const mongoose = require('mongoose');

const reproWellFormSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },

}) 

module.exports = mongoose.model('reprowellforms', reproWellFormSchema);