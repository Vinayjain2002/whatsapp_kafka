const fs= require('fs')

exports.validateFolderExists= function(path, callback){
    console.log("Validater Path");
    if(path== undefined){
        console.log('Path is undefined');
        //  returning the status 400 that path does not exists
        return callback({status: 400, "message": "Path is undefined or empty"});
    }
    const dir= './'+ path;

    if(!fs.existsSync(dir)){
        console.log("file does not exists")
        return callback({status: 404, "message": "Directory not found"})
    }
    else{
        return callback({status: 200, "message": "Directory exists"});
    }

}