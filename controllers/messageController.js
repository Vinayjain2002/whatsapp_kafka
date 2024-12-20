import Message from "../models/messageModel.js";
import User from '../models/userModel.js'
import Chat from '../models/chatModel.js'

export const sendMessage= async(req, res)=>{
    try{
       
        
    }catch(err){
        return res.status(500).json({"message": "Internal Server Error"})
    }
}

export const getMessages= async(req,res)=>{
    try{
        const {chatId}= req.params;
        const message= await Message.find({chatId: chatId}).populate({
            path: "sender",
            model: "User",
            select: "name profilePic email"
        }).populate({
            path: "chatId",
            model: "Chat"
        });

        return res.status(200).json({"message": "All Messages Fetched Successfully", "message": message});
    }
    catch(err){
        return res.status(500).json({"message": "Internal Server Error"})
    }
}