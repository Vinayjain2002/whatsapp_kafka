var FileShare= require('../models/fileShare');

exports.insertShareDetails= function(data,callback){
    console.log(data);
    const fileShare= new FileShare();

    fileShare.fromUserId= data.fromUserId;
    fileShare.toUserId= data.toUserId;
    fileShare.fileDetailsId= data.file;

    fileShare.save(function (err){
        if(err){
            console.log(JSON.stringify(err));
            callback({status: 400, message: err})
        }
        else{
            console.log(fileShare);
            callback(null, fileShare)
        }
    })
}
