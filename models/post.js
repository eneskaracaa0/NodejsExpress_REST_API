import mongoose from 'mongoose';

const PostSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
     stock:{
        type:Number,
        default:0
    },
    date:{
        type:Date,
        default:new Date()
    }


})

const Post=mongoose.model('Post',PostSchema);

export default Post