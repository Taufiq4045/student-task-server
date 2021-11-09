var express = require('express');
var router = express.Router();
const AssignmentModule = require('../module/assignmentModule');

router.post('/saveassignment', AssignmentModule.postAssignment);
router.get('/getassignment', AssignmentModule.getAssignment);
router.patch('/updateassignment/:id', AssignmentModule.updateAssignment);
router.delete('/deleteassignment/:deleteId', AssignmentModule.deleteAssignment);
module.exports= router;