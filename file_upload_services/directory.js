import fileDetails from '../models/fileDetails.js'
import fs from 'fs'
import util from './util.js'

export const makeDirectory= async(data)=>{
    try{
        const validated= util.validateFolderExists(data.path);
        if(validated.status== 200){
           const validated1=  util.validateFolderExists(data.path+'/'+ data.dirName);
           if(validated1.status==400){
                fs.mkdirSync(data.path +'/'+ data.dirName);
                if(fs.existsSync(data.path + '/'+ data.dirName)){
                    return {"message": "Folder created Successfully", status: 200}
                }
           }
           else{
                console.log("not making dir")
                return {"message": "Folder already exists", status: 200}
             }
        }
        else{
            return {"message": "Path does not exists", status: 404}
        }
    }
    catch(err){
        return {"message": "Internal Server Error", status: 500}
    }
}

export const saveDirectory= async(data)=>{
    try{
        console.log(data);
        if(data.dirName !== "" || data.dirName!= undefined){
            var folder= new fileDetails();
            folder.fileName= data.dirName;
            folder.filePath= data.path;
            folder.fileType= 1;
            folder.userId= data.userId;
            folder.fileStarInd=0;
            folder.fileCreatedDt= Date.now();
            
            const savedFolder= await folder.save();
            if(!savedFolder){
                return {"message": "Error while creating folder", status: 404}
            }
            else{
                return {"message": "Foder Created Successfully", folder: folder}
            }

        }
    }
    catch(err){
        return {"message": "Internal Server Error", satus: 500}
    }
}

