var FileDetails= require('../models/fileDetails')
const ObjectId= require('mongoose').Types.ObjectId;

exports.star= function(message,callback){
    console.log("star file");

    var fileId= message.file;
    var fileStarInd= message.fileStarInd;
    console.log(fileId)
    console.log(fileStarInd)

    if(fileId !==null || fileId !== "" || fileStarInd !== "" || fileStarInd !== ""){
        FileDetails.findOneAndUpdate({_id: new ObjectId(fileId)}, {
            fileStarInd: fileStarInd
        }, function(err, result){
            if(err){
                console.log("err")
                console.log(err);
                callback(err, null);
            }
            else{
                callback(null, null);
            }
        })
    }
}
