import Meeting from '../models/Meetings.js';
import Metting from '../models/Meetings.js'

export const allMettings= async(req, res)=>{
    try{
        const userId= req.params();
        if(!userId){
            return res.status(401).json({"message": "Please define the userId"});
        }
        const userMetting= await Metting.find({"admin": userId}).populate('admin','-password').populate('user', '-password');
        const otherMetting= (await Metting.find({"user": userId})).populate('admin', '-password').populate('user', '-password');

        if(!userMetting || !otherMetting){
            return res.status(404).json({"message": "Error while finding the User Mettings"})
        }
        return res.status(200).json({"message":"User mettings fetched successfully", meeting: {userMetting, otherMetting}})
    }
    catch(err){
        return res.status(500).json({"message": "Internal Server Error"})
    }
}

export const particularMetting= async(req,res)=>{
    try{
        const {mettingId}= req.params();
        if(!mettingId){
            return res.status(401).json({"message": "Please define the meetingId"})
        }
        const meeting= await Metting.findById(mettingId);
        if(!meeting){
            return res.status(404).json({"message": "Error while finding the meeting Details"})
        }
        return res.status(200).json({"message": "Metting Details fetched Successfully"});
    }
    catch(err){
        return res.status(500).json({"message": "Internal Server Error"})
    }
}

export const createMeeting= async(req,res)=>{
    try{
        const data= req.body;
        if(!data || !data.admin || !data.user){
            return res.status(401).json({"message": "Error while creating meeting"})
        }
        const newMetting= new Metting({
            admin: data.admin,
            user: data.user
        });
        newMetting.save();
        return res.status(200).json({"message": "New Metting Created Successfully"});
    }
    catch(err){
        return res.status(500).json({"message": "Internal Server Error"})
    }
}


export const deleteMetting= async(req,res,next)=>{
    try{
        const {meetingId}= req.params();
        if(!meetingId){
            return res.status(401).json({"message": "Please specify the meeting Id"})
        }
        const deleteMetting= await Meeting.findOneAndDelete({_id: meetingId});
        if(!deleteMetting){
            return res.status(404).json({"message": "Error while deleting the meeting Details"})
        }
        return res.status(200).json({"message": "Meeting deleted Successfuly", meeting: deleteMetting})
    }
    catch(err){
        return res.status(500).json({"message": "Internal Server Error"})
    } 
}