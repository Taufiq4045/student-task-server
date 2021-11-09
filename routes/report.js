var express = require('express');
var router = express.Router();
const ReportModule = require('../module/reportModule');

router.post('/savereport', ReportModule.postReport);
router.get('/getreport', ReportModule.getReport);
router.patch('/updatereport/:id', ReportModule.updateReport);
router.delete('/deletereport/:deleteId', ReportModule.deleteReport);
module.exports= router;