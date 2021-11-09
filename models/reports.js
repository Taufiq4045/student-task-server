const mongoose = require('mongoose');
require('mongoose-type-url');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    task: {
        type: Number,
        required: true,
    },
    github: {
        type: mongoose.SchemaTypes.Url,
    },
    deployed: {
        type: mongoose.SchemaTypes.Url,
    }
});

const Report = mongoose.model('Report', reportSchema, 'report');
module.exports = Report;