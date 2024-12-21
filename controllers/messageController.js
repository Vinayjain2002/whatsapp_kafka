import Message from "../models/messageModel.js";
import User from '../models/userModel.js'
import Chat from '../models/chatModel.js'

export const sendMessage= async(req, res)=>{
    try{
       const {chatId, message}= req.body;
       let msg= await Message.create({
            sender: req.rootUserId,
            message: message,
            chatId: chatId
       });
       msg = await (
        await msg.populate('sender', 'name profilePic email')
      ).populate({
        path: 'chatId',
        select: 'chatName isGroup users',
        model: 'Chat',
        populate: {
          path: 'users',
          select: 'name email profilePic',
          model: 'User',
        },
      });
        
      await Chat.findByIdAndUpdate(chatId,{
        latestMessage: msg
      });

      return res.status(200).json({"message": "Message sent Successfully", msg: msg})

    }catch(err){
        return res.status(500).json({"message": "Internal Server Error"})
    }
}

// used up by the kafka for the bulk messaging
export const sendBulkMessage= async(req,res)=>{
    try{
        // here we are storing the muliple messages of the user that are sent by him. In a particular Chat
        const {chatId}= req.params();
        const allUserMessages= req.body;
        if(!allUserMessages){
            return res.status(401).json({"message": "Error while storing the message"});
        }
        allUserMessages.forEach( async (userMessage) =>  {
            let msg = await Message.create({ sender: req.rootUserId, message: userMessage.message, chatId });
            msg = await (
              await msg.populate('sender', 'name profilePic email')
            ).populate({
              path: 'chatId',
              select: 'chatName isGroup users',
              model: 'Chat',
              populate: {
                path: 'users',
                select: 'name email profilePic',
                model: 'User',
              },
            });

             await Chat.findByIdAndUpdate(chatId, { latestMessage: msg}); 
        });
        return res.status(200).json({"message": "All the user message are saved"});
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