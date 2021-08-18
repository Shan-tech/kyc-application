// IMPORT mongoose MONGO lib
const mongoose=require('mongoose');
// SCHEMA
const schema=new mongoose.Schema({
   "user_name": {
        type:String,
        required:true
    },
   "user_img_url": {
        type:String,
        required:true
    },
   "user_status": {
        type:String,
        required:true
    }
});
const user=mongoose.model('user',schema);
// EXPORT SCHEMA
module.exports=user;