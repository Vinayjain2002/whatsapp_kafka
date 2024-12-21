import multer  from 'multer'
import fs, { stat } from 'fs'
import async from 'async'
import FileDetails from '../models/fileDetails'

const self= this;
const uploadPath= ""

export const fileUpload= async(data)=>{
    try{
        const fileData= data.fileChunk;
        const fileName= data.fileName;
        const userId= data.userId;

        // creating a new file Details
        const fileDetails= new FileDetails({
            fileName: fileName,
            fileCreatedDt: Date.now(),
            filePath: uploadPath,
            fileType: 0,
            fileStarInd: 0,
            userId: userId
        });

        const uploadPathx= uploadPath+'/'+ fileName;
        if(fileData != null || fileName !=null){
            console.log(uploadPath+'/'+ fileName);
            var options= {encoding: 'utf8'}
            var wstream= fs.createWriteStream(uploadPathx, options);

            // now writing the data using the wstream at the location of the uploadPathx
            wstream.write(fileData,async function(){
                console.log(uploadPath+'/'+ fileName);
                wstream.close();
                // saving the data in the mongoDb
                const savedFile= await fileDetails.save();
                if(savedFile){
                    return {"message": "File Uploaded Successfully", status: 200}
                }
                else{
                    return {"message": "Error while uploading the file", status: 404}
                }
            });
        }
    }
    catch(err){
        return {"message": "Internal Server Error", status: 500}
    }
}


export const setUploadPath= async(data)=>{
    try{
        console.log(data.uploadPath);
        uploadPath= data.uploadPath;

        // console.log("upload path is set")
        console.log(uploadPath);
        return uploadPath;
    }
    catch(err){
        return res.status(500).json({"message": "Internal Server Error"});
    }
}
