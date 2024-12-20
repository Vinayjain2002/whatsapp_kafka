import Chat from '../models/chatModel.js'
import User from '../models/userModel.js'

export const accessChat= async(req,res)=>{
    try{
        const {userId}= req.body;
        if(!userId){
            return res.status(401).json({"message": "Provide User's Id"})
        }
        let ChatExists= await Chat.find({
            isGroup: false,
            $and: [
                {users: {$elemMatch: {$eq: userId}}},
                {users: {$elemMatch: {$eq: req.rootUserID}}},
            ]
        }).populate('users', '-password').populate('latestMessage');

        // used to populate the data from the latestMessage.sender using the User model
        ChatExists= await User.populate(ChatExists, {
            path: 'latestMessage.sender',
            select: 'name email profilePic'
        });
        if(ChatExists.length){
            return res.status(200).json({"message": "Chat find Successfully", chat: ChatExists})
        }
        else{
            // as the chat does not exists with theis user so creating a new chat with this user
            let data= {
                chatName: 'sender',
                users: [userId, req.rootUserID],
                isGroup: false
            }
            try{
                const newChat= new Chat(data);
                newChat.save();
                const chat= await Chat.find({_id: newChat._id}).populate('users', '-password');
                return res.status(200).json({"message": "new Chat Created Successfully", chat: chat});
            }
            catch(err){
                return res.status(500).json({"message": "Error while creating new Chat",error: err});
            }
        }
    }
    catch(err){
        return res.status(500).json({"message": "Internal Server Error"});
    }
}

export const fetchAllChats= async(req,res)=>{
    try{

    }
    catch(err){
        return res.status(500).json({"message": "Internal Server Error", error: err});
    }
}

export const createGroup=async(req,res)=>{
    try{        
        const {chatName, users}= req.body;
        if(!chatName || !users){
            return res.status(400).json({"message": "Please enter chatName and users"});
        }
        const parsedUsers= JSON.parse(users)
        if(parsedUsers.length<2){
            res.status(400).send({"message": "Please enter at least 2 users to create a group"});
        }
        parsedUsers.push(req.rootUser)
        try{
            const chat= await Chat.create({
                chatName: chatName,
                users: parsedUsers,
                isGroup: true,
                groupAdmin: req.rootUserID
            })
            const createdChat= await Chat.findOne({_id: chat._id}).populate('users', '-password').populate('groupAdmin', '-password');
            return res.status(200).json({"message": "New Group Created Successfully"});
        }
        catch(err){
            return res.status(500).json({"message": "Error while creating new Group", error: err});
        }
    }catch(err){
        return res.status(500).json({"message": "Internal Server Error"})
    }
}

export const addToGroup= async(req,res)=>{
    try{
        const {userId, chatId}= req.body;
        const chat= await Chat.findOne({_id: chatId});
        if(!chat.users.includes(userId)){
            const updatedChat= await Chat.findByIdAndUpdate(chatId, {
                $push: {users: userId}
            }) .populate('groupAdmin', '-password')
            .populate('users', '-password');
            if(!updatedChat){
                return res.status(404).json({"message": "Error while adding Members"})
            }
            else{
                return res.status(200).json({"message":"Users Added Successfully",chat: updatedChat});
            }
        }
        else{
            return res.status(409).json({"message": "User already exists in grp"})
        }
    }
    catch(err){
        return res.status(500).json({"message": "Internal Server Error"})
    }
}

export const removeFromGroup= async(req,res)=>{
    try{
        const {userId, chatId}= req.body;
        const existing= await Chat.findOne({_id: chatId});
        // pull used to remove a user from the list of the users
        if(existing.users.includes(userId)){
            Chat.findByIdAndUpdate(chatId, {
                $pull: {users: userId}
            }).populate('groupAdmin', '-password')
            .populate('users', '-password')
            .then((e) => res.status(200).send(e))
            .catch((e) => res.status(404));
        }
    }
    catch(err){
        return res.status(500).json({"message": "Internal Server Error"})
    }
}

export const renameGroup = async(req,res)=>{
    try{
        const { chatId, chatName } = req.body;
        if(!chatId || !chatName){
            return res.status(400).json({"message": "Invalid Request"})
        }
        const chat = await Chat.findByIdAndUpdate(chatId, {
            $set: {chatName}
        }) .populate('users', '-password')
        .populate('groupAdmin', '-password');
        if(!chat){
            return res.status(404).json({"message": "No such Group exists"});
        }
        return res.status(200).json({"message": "Group Renamed Successfully", chat: chat});
    }
    catch(err){
        return res.status(500).json({"message": "Internal Server Error"})
    }
}