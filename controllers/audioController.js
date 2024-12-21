import Audio from '../models/AudioModel.js'

// finding all the audio calls records
export const allAudioCalls= async(req,res)=>{
    try{
        const {userId}= req.params();
        if(!userId){
            return res.status(401).json({"message": "Send User Id"})
        }
        const adminCalls= await Audio.find({admin: userId}).populate('admin', '-password').populate('user', '-password')
       
        const userCalls= await Audio.find({user: userId}).populate('admin','-password').populate('user', '-password'); 
        if(!adminCalls && !userCalls){
            return res.status(200).json({"message": "No user calls found"});
        }
        return res.status(200).json({"message": "All the user calls are found", userCalls: userCalls, adminCalls: adminCalls});
    }
    catch(err){
        return res.status(500).json({"message": "Internal Server Error"})
    }
}

export const particularAudioCall= async(req,res)=>{
    try{
        const {audioCallId}= req.params();
        if(!audioCallId){
            return res.status(401).json({"message": "Define the audio Call Id"})
        }
        const audioCall= await Audio.findById(audioCallId);
        if(!audioCall){
            return res.status(404).json({"message": "Error while finding the audio call details"});
        }
        return res.status(200).json({"message": "Data fetched Successfully", data: audioCall})
    }
    catch(err){
        return res.status(500).json({"message": "Internal Server Error"})
    }
}

// here we are gonna to create the Object for the audio call
export const createAudioCall= async(req,res)=>{
    try{
       if(!req.body.admin || !req.body.user){
            return res.status(401).json({"message": "Please define the user Details"})
       }
       const newAudioCall= new Audio({
            admin: req.body.admin,
            user: req.body.user 
       });
       const savedAudioCall= await newAudioCall.save();
       if(!savedAudioCall){
            return  res.status(404).json({"message": "Error while saving the data"});
       }
      return res.status(200).json({"message": "Audio call detail Successfully"});
    }
    catch(err){
        return res.status(500).json({"message": "Internal Server Error"})
    }
}

// here we are gonna to delete the audio call
export const deleteAudioCall = async(req,res)=>{
    try{
        const {audioCallId}= req.body;
        if(!audioCallId){
            return res.status(401).json({"message": "Define audioCallId to be deleted"})
        }
        const deleteAudioCall= Audio.findOneAndDelete({_id:audioCallId});
        if(!deleteAudioCall){
            return res.status(404).json({"message": "Error while deleting the Audio call Record"});
        }
        return res.status(200).json({"message": "Audio call deleted Successfully",audioCall: deleteAudioCall})
    }
    catch(err){
        return res.status(500).json({"message": "Internal Server Error"})
    }
}