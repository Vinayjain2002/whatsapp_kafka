const mongoose= require('mongoose')

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

meetSchema= mongoose.model("Meeting", meetSchema);
module.exports= meetSchema;