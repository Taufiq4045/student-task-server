const mongoose = require('mongoose');
require('mongoose-type-url');
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    task: {
        type: Number,
        required: true,
    },
    github: {
        type: mongoose.SchemaTypes.Url,
    },
    description: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    deployed: {
        type: mongoose.SchemaTypes.Url,
    },
    reference: {
        type: mongoose.SchemaTypes.Url,
        required: true
    }
});

const Assignment = mongoose.model('Assignment', assignmentSchema, 'assignment');
module.exports = Assignment;