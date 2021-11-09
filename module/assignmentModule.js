const Assignment = require('../models/assignment');

//Object Creation Using model
exports.postAssignment = async (req, res, next) => {
    const assignment = new Assignment({
        task : req.body.task,
        github : req.body.github,
        description : req.body.description,
        deployed : req.body.deployed,
        reference : req.body.reference,
    })

    // save() function to post data
    var response  = await assignment.save();
    res.send(response);
}

exports.getAssignment = async (req, res, next) => {
    var response = await Assignment.find();
    res.send(response);
}

exports.updateAssignment = async (req, res, next) => {
    const id = req.params.id
    var response = await Assignment.findByIdAndUpdate(id, {
        github : req.body.github,
        deployed : req.body.deployed,
    }, { new : true});
    res.send(response);
}

exports.deleteAssignment = async (req, res, next) => {
    const id = req.params.deleteId
    var response = await Assignment.findByIdAndRemove(id)
    res.send(response);
}