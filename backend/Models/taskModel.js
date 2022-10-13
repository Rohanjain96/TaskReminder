const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    complete:{ 
     type:Boolean,
     default:false
    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true});

const Task = mongoose.model('Task',taskSchema);
module.exports = Task;