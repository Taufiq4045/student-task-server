const Report = require('../models/reports');

//Object Creation Using model
exports.postReport = async (req, res, next) => {
    const report = new Report({
        task : req.body.task,
        github : req.body.github,
        deployed : req.body.deployed,
    })

    // save() function to post data
    var response  = await report.save();
    res.send(response);
}

exports.getReport = async (req, res, next) => {
    var response = await Report.find();
    res.send(response);
}

exports.updateReport = async (req, res, next) => {
    const id = req.params.id
    var response = await Report.findByIdAndUpdate(id, {
        github : req.body.github,
        deployed : req.body.deployed,
    }, { new : true});
    res.send(response);
}

exports.deleteReport = async (req, res, next) => {
    const id = req.params.deleteId
    var response = await Report.findByIdAndRemove(id)
    res.send(response);
}