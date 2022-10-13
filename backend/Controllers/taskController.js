const mongoose = require("mongoose");
const  Task = require("../Models/taskModel.js");
const CryptoJS = require("crypto-js");

const readtasks = async (req, res) => {
    try {
        let tasks = await Task.find({userId: { $eq: req.user._id }}).lean();
        tasks = tasks.map(task=> {
        var bytes  = CryptoJS.AES.decrypt(task.content, 'mysecretkey');
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        return({...task,content:originalText})
    })
        res.status(200).json(tasks);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

    const createtasks = async (req, res) => {
    try {
        let {title,content} = req.body;
        if (!title || !content) {
            res.status(400);
            throw new Error("Please Enter all the Feilds");
        }
        const encrytedtaskcontent = CryptoJS.AES.encrypt(content,"mysecretkey").toString();
        const task = new Task({title,content:encrytedtaskcontent,userId:req.user._id});
        await task.save();
        var bytes  = CryptoJS.AES.decrypt(encrytedtaskcontent, 'mysecretkey');
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        const decryptedtask = {...task._doc,content:originalText}
        res.status(201).json(decryptedtask);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}
const updatetasks = async (req, res) => {
    
        const { id } = req.params;
        const {title,content,complete} = req.body;
        const encrytedtaskcontent = CryptoJS.AES.encrypt(content,"mysecretkey").toString();
        if(!mongoose.Types.ObjectId.isValid(id))
        {
           return res.status(404).send(`The id ${id} is not valid`);
        }
        const updatedtask = {title,content:encrytedtaskcontent,complete,_id:id};
        let newtask = await Task.findByIdAndUpdate(id,updatedtask,{new:true});
        var bytes  = CryptoJS.AES.decrypt(encrytedtaskcontent, 'mysecretkey');
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        newtask = {...newtask._doc,content:originalText}
        res.json(newtask);
}
const deletetask = async (req, res) => {
    
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id))
        {
           return res.status(404).send(`The id ${id} is not valid`);
        }
        await Task.findByIdAndDelete(id);
        res.json("task deleted");
}


module.exports = { readtasks, deletetask,updatetasks,createtasks}
