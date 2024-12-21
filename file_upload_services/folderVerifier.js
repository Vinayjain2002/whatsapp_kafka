import fs from 'fs'

export const validateFolderExists= async(data)=>{
    try{
        const path= data.path;
        if(path== undefined){
            console.log("Path is undefined")
            return {"message": "Path is undefined or empty", status: 400}
        }
        const dir= './'+ path;
        if(!fs.existsSync(dir)){
            console.log("File does not exists")
            return {"message": "Directory not found", status: 404}
        }
        else{
            return {"message": "Directory exists", status: 200}
        }
    }
    catch(err){
        return {"message": "Internal Server Error", status: 500}
    }
}