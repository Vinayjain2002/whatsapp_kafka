import fileShare from '../models/fileShare.js'

export const insertShareDetails= async (data)=>{
    try{
        const fileShareData= data.data;
        const fileShareObject= new fileShare();
        fileShareObject.fromUserId= fileShareData.fromUserId;
        fileShareObject.toUserId= fileShareData.toUserId;
        fileShareObject.fileDetailsId= fileShareData.fileDetailsId;

        const saveFileShare= await fileShareObject.save();
        if(!saveFileShare){
            return {"message": "Error while saving the file Details", status: 400}
        }
        return {"message": "File Shared Successfully", fileShare: saveFileShare, status: 200}
    }
    catch(err){
        return {"message": "Internal Server Error", status: 500}
    }
}