const Admin  = require('../models/admin');
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
    // Admin Input Validation - Joi Validation
    const schema = Joi.object({
        fname: Joi.string().min(4).max(15).required(),
        lname: Joi.string().min(1).max(15).required(),
        email: Joi.string().min(6).max(50).email().required(),
        password: Joi.string().min(8).max(12).required(),
        address: Joi.string().min(4).max(50).required(),
        phone: Joi.string().pattern(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/).required(),
        role: Joi.string().min(5).required()
    })

    var {error} = await schema.validate(req.body);
    if (error) return res.status(400).send({msg : error.details[0].message});

    // Email already exists
    var existAdmin = await Admin.findOne({"email": req.body.email}).exec();
    if(existAdmin) return res.status(400).send({msg : "Email already exists"});

    // Create or Register
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const admin = new Admin({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        phone: req.body.phone,
        role: req.body.role
    })

    var response = await admin.save();
    res.send(response);
}

exports.login = async (req, res, next) => {
    // Admin input Validation and Joi Validation
    const schema = Joi.object({
        email: Joi.string().min(6).max(50).email().required(),
        password: Joi.string().min(8).max(15).required()
    })
    var {error} = await schema.validate(req.body);
    if (error) return res.status(400).send({msg : error.details[0].message});

    // Is registered Admin
    var existAdmin = await Admin.findOne({"email": req.body.email}).exec();
    if(!existAdmin) return res.status(400).send({msg : "Email not registered"});

    // Password compare check
    const isValid = await bcrypt.compare(req.body.password, existAdmin.password);
    if(!isValid) return res.status(404).send({msg : "Password doesn't match"});

    // Generate Token
    var token = jwt.sign({existAdmin}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
    res.send(token);
}

exports.getAdmin = async (req, res, next) => {
    var response = await Admin.find();
    res.send(response);
}

exports.deleteAdmin = async (req, res, next) => {
    const id = req.params.deleteId
    var response = await Admin.findByIdAndRemove(id)
    res.send(response);
}





