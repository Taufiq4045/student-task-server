const admins = require('../models/admin');
// const mongo = require("../shared/mongo")
const crypto=require("crypto")
const bcrypt=require("bcrypt");
const sendMail=require('./sendMailer');
// const { ObjectId } = require('bson');
const mongoose =require("mongoose")




const service= {

    async sendToken(req,res,next){
        let user= await admins.findOne({email:req.body.email})
        console.log(user)
        if(!user) res.status(400).send("User does not exists")
        
        if(user.resetToken) 
        {
            let data= await admins.findOneAndUpdate({email:user.email},{$unset:{resetToken:1,resetExpire:1}})
            console.log(data)
        }
        // creating a string and hashing using bcrypt
        let token=crypto.randomBytes(32).toString("hex")
        let hashToken=await bcrypt.hash(token,Number(12))
        console.log(token,hashToken)
        //creating expiry after 1 hour
        let expiry= new Date(Date.now()+ (1*3600*1000) )
        //updating the admins table with resetToken and resetExpire
        let data= await admins.findOneAndUpdate({email:user.email},{$set:{resetToken:hashToken,resetExpire:expiry}},{ReturnDocument: "after" })
        console.log(data)

   
        const link=`https://student-task-submission.herokuapp.com/forgotpassword/${user._id}/${token}`
        
        await sendMail(user.email,"Password Reset",link)
        
        res.status(200).send({id:user._id,token: token})  
    },
    async verifyToken(req,res,next){
           
        let user= await admins.findById(req.params.userId);
    if(!user) return res.status(400).send("Invalid link or expired")

    let token=req.params.token

    const isValid= await bcrypt.compare(token,user.resetToken)
    const expire =   user.resetExpire > Date.now()

    if( isValid &&  expire ){
        res.status(200).send({success:true})
    }
    else res.status(400).send({Error:"invalid link or expired"})
    },

    async verifyAndUpdatePassword(req,res,next){

        var id = mongoose.Types.ObjectId(req.params.userId);
        


        let user= await admins.findOne({_id: id});
    if(!req.params.token) return res.status(400).send("Invalid link")


    let token=req.params.token


    const isValid= await bcrypt.compare(token,req.params.token)
    // const expire =   user.resetExpire > Date.now()
    //  console.log(Date.now(), user.resetExpire.getTime(),expire)
     if( req.params.token )
     {
         const salt = await bcrypt.genSalt(10);
         req.body.password = await bcrypt.hash(req.body.password, salt);
         const password =req.body.password;
        // const hashPassword =await bcrypt.hash(password,Number(12))
         // console.log(hashPassword)
         let data= await admins.findOneAndUpdate({_id: id},{$set:{password:password}},{ReturnDocument: "after" })
         console.log(data)
         res.status(200).send("password updated successfully")
     }
     else res.status(400).send("Invalid link or expired")
    },

    async resetPassword (req, res, next){

        var existUser = await admins.findOne({"email": req.body.email}).exec();

        const isValid = await bcrypt.compare(req.body.password, existUser.password);

        if(isValid)
        {
            const salt = await bcrypt.genSalt(10);
            req.body.newpassword = await bcrypt.hash(req.body.newpassword, salt);
            const password =req.body.newpassword;
           // const hashPassword =await bcrypt.hash(password,Number(12))
            // console.log(hashPassword)
            let data= await admins.findOneAndUpdate({_id: existUser._id},{$set:{password:password}},{ReturnDocument: "after" })
            console.log(data)
            res.status(200).send("password updated successfully")
        } else{
             res.status(400).send("User does not exists")
        }
    }
}

module.exports=service
