import mongoose  from "mongoose";
const meetSchema= new mongoose.Schema({
    admin: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Meeting= mongoose.model("Meeting", meetSchema);
export default Meeting;