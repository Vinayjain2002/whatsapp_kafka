const mongoose= require('mongoose')
const FileDetailsSchema= new mongoose.Schema({
    fileName: {
        type: String
    },
    fileCreatedDt: {
        type: Date
    },
    fileDeleteDt: {
        type: Date
    },
    fileShareDt: {
        type: Date
    },
    fileType: {
        type: Number
    },
    filePath: {
        type: String
    },
    fileStarInd: {
        type: Number,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const FileDetails= mongoose.model("FileDetails", FileDetailsSchema);
module.exports= FileDetails;