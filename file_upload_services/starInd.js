import fileDetails from '../models/fileDetails.js'
import mongoose from 'mongoose'

export const star= async(data)=>{
    try{
        console.log("Going to start the file")
        const fileId= data.file;
        // is we need to mark the file as important or not
        const fileStarInd= data.fileStarInd;
        if(fileId!=null || fileId!= "" || fileStarInd!=="" || fileStarInd !== ""){
            const updateData= await fileDetails.findOneAndUpdate({
                _id: new mongoose.Types.ObjectId(fileId)
            },{
                fileStarInd: fileStarInd
            });

            if(updateData){
                return {"message": "File is marked as Start", status: 200}
            }
            return {"message": "Error while markign the file",status: 404}
        }
    }
    catch(err){
        return {"message": "Internal Server Error", status: 500}
    }
}