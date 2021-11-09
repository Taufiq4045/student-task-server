var express = require('express');
var router = express.Router();
var Reg = require('../module/registerAdmin');

router.post('/register', Reg.register);
router.post('/login', Reg.login);
router.get('/getadmin', Reg.getAdmin)
router.delete('/:deleteId', Reg.deleteAdmin);


module.exports = router;