const router= require('express').Router();

const service = require('../module/adminPassword.service');


//generating token and sending mail
router.post("/",service.sendToken)

//verifying token with get Method
router.get("/:userId/:token",service.verifyToken)


//verifying token and resetting password
router.post("/:userId/:token",service.verifyAndUpdatePassword)

// rest password after login
router.post("/resetpassword", service.resetPassword)
module.exports=router;