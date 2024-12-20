import mongoose from "mongoose";
const fileShareSchema= new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    fileDetailsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'FileDetails'
    }
});

const FileShare= mongoose.model("FileShare", fileShareSchema);
export default FileShare;