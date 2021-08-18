// IMPORTS
const express=require('express');
const mongoose=require('mongoose');
const route=require('./router/routes'); 
// INIT
const app=express();
app.use(express.static('./public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
// MONGO CONNECTION
const URI="mongodb+srv://admin:kyc@kyc.1qqda.mongodb.net/kyc?retryWrites=true&w=majority";
mongoose.connect(URI,{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then((res)=>console.log("connected successfuly")).catch((err)=>console.log("Failed connecting"));
app.use(route);
// SET PORT NO.
app.listen(5000,()=>console.log("Listening to port 5000.."))