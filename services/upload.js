const multer= require('multer')
const fs= require('fs')
const async= require('async')
const FileDetails= require('../models/fileDetails')
const fileName="";
const self= this;
const uploadPath= ""

exports.fileUpload= function(message, callback){
    console.log("file upload")
    const fileData= message.fileChunk;
    const fileName= message.fileName;
    const userId= message.userId;

    console.log(fileName)
    console.log(userId)

    var fileDetails= new FileDetails({
        fileName: fileName,
        fileCreatedDt: Date.now(),
        filePath: uploadPath,
        fileType:0,
        fileStarInd:0,
        userId: userId
    })

    var uploadPathx= uploadPath+'/'+ fileName;
    if(fileData!= null || fileName!=null){
        console.log(uploadPath+'/'+ fileName);

        var options= {encoding: 'utf8'}
        var wstream= fs.createWriteStream(uploadPathx, options);
        // now writing the data using the wstream at the location of the uploadPathx

        wstream.write(fileData, function(){
            console.log(uploadPath+'/'+ fileName);
            wstream.close();
            // saving the data in the mongoDb
            fileDetails.save(function(err){
                if(err){
                    console.log(JSON.stringify(err));
                }
                else{
                    callback(err);
                }
            });
            
        })
    }
}


exports.setUploadPath= function(message, callback){
    console.log(message)
    uploadPath= message.uploadPath;

    // need to define the logic for the upload path
    console.log("upload path is set-----------")
    console.log(uploadPath)
    callback(null, uploadPath);
}