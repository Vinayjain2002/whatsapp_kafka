const mongoose= require("mongoose")

const AudioSchema= new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Audio= mongoose.model("Audio", AudioSchema);
module.exports= Audio;