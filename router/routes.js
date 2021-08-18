// IMPORTS
const express=require('express');
const route=express.Router();
const path=require('path');
const user=require('../models/model');  // database schema

// PAGE ROUTES
route.get('/home',(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/home.html"))
});

route.get('/admin',(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/admin.html"))
});

route.get('/acceptedUsers',(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/acceptedUsers.html"))
});

route.get('/pendingRequests',(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/requests.html"))
});

// -----------API's------------

// add data to mongo
route.post('/addTodb',(req,res)=>{
    var value=new user({
        "user_name":req.body.user_name,
        "user_img_url":req.body.user_img_url,
        "user_status":req.body.user_status
    });
    value.save().then((data)=>{
        res.json({"result":data});
    })
});

// fetch users from mongo
route.get('/getAllUser',(req,res)=>{
    user.find({},(err,data)=>{
        if(err!=null){
            console.log(err);
        }else{
            res.json(data);
        }
    });
});

//  delete any user
route.post('/declineUser',(req,res)=>{
    user.findByIdAndRemove({"_id":req.body.user}).then((data)=>res.json({"result":"ok"})).catch((err)=>res.json({"result":"failed"}))
});

// update any user
route.post('/userStatus',(req,res)=>{
    user.findByIdAndUpdate({"_id":req.body._id},{"user_status":req.body.user_status})
    .then((data)=>res.json({"result":"ok"}))
    .catch((err)=>console.log(err));
});
module.exports=route;