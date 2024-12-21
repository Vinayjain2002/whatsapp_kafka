import fs from 'fs'

export const validateFolderExists= async(path)=>{
    try{
        if(path== undefined){
            console.log("path is empty")
            return {"message": "Path is empty", "status": 401};
        }
        const dir= './'+ path;
        if(!fs.existsSync(dir)){
            return {"message": "Folder does not exists", status: 400}
        }
        return {"message": "Folder exists", status: 200}
    }
    catch(err){
        return {"message": "Error while finding path", "status": 500}
    }
}   