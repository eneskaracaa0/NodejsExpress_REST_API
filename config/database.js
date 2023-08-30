import mongoose from 'mongoose';


const conn=()=>{
    mongoose.connect(process.env.MONGO_DB,{
        dbName:"usermanagement",
        useNewUrlParser:true,
        useUnifiedTopology:true,

    }).then(()=>{
        console.log('CONNECT SUCCESS DATABASE',);
    }).catch((err)=>{
        console.log(err);
    })
}

export default conn