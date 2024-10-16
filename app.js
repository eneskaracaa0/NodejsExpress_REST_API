import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import conn from './config/database.js';
import Auth from './routes/auth.js';
import Post from './routes/post.js';
import cookieParser from 'cookie-parser';



dotenv.config();


const port =process.env.PORT;
const app=express();
app.use(cors());
app.use(express.json({limit:'30mb',extended:true}))
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//router (register-login)
app.use('/',Auth);
app.use('/',Post);


//database connection
conn();


app.get('/',(req,res)=>{
    res.json({message:'deneme deneme'});
    console.log('jenkins push github project')
})


app.listen(port,()=>{
    console.log('SERVER İS RUNNİNG ON PORT:',port);
        console.log('jenkins push github project')

})


