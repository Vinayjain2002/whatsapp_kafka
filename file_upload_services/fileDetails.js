import async from 'async'
import validateFolderExists from './util.js'
import FileDetails from '../models/fileDetails.js'
import FileShare from '../models/fileShare.js'
import mongoose from 'mongoose'

export const getFileList= async(data)=>{
    try{
        const filePath= data.filePath;
        const userId= data.userId;
        const userName= data.userName;

       const validatedFolder= validateFolderExists(userName);
       if(validatedFolder.status== 200){
        if(filePath=== "" || filePath== undefined){
            filePath= './'+ filePath;
        }
        const foundFile=await FileDetails.find({userId: new mongoose.Types.ObjectId(userId), filePath: filePath});
        if(foundFile.length >0){
            const fileList= [{fileName: '..', filePath: filePath}]
            foundFile.map(function(file,index){
                fileList[index+1]= file;
            })
            return {"message": "Files found Succesfully", files: fileList};
        }
        else{
            return {"message": "No file is found", files: foundFile};
        }
       }
    }
    catch(err){
        return {"message": "Internal Server Error", status: 500}
    }
}

export const getSharedFileList= async(data)=>{
    try{
        const sharePath= data.sharePath;
        const userId= data.userId;

        const sharedFiles= await FileShare.find({toUserId: new mongoose.Types.ObjectId(userId)});
        if(sharedFiles && sharedFiles.length > 0){
            const sharedFileList= [];
            const innerFlag= false;
            if(sharePath== undefined || sharePath== null){
                sharedFileList= [{fileName: '..', filePath: sharePath}]
                innerFlag= true;
            }
            // need to write the 72 th line
        }
        else{
            return {"message": "No shared Files Found", status: 200}
        }

    }
    catch(err){

    }
}
