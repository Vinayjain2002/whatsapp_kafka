const express= require('express');
const mongoDBConnect = require('./Connection/mongoDB/connection')
const dotenv= require('dotenv')
const bodyParser= require('body-parser')
const cors= require('cors')
const http= require('http')
const {Server}= require('socket.io')

// used for the peer to peer connection for the WebRTC for the audio, video.
const {ExpressPeerServer}= require('peer');

const app= express()
dotenv.config();
const corsConfig={
    origin: process.env.BASE_URL,
    credentials: true
};
const server= http.createServer(app)
const io= new Server(server)
const peerServer= ExpressPeerServer(server, {
    debug: true
});

app.use('/peerja', peerServer);
// app.set('view engine', 'ejs')

// for serving the static files
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cors(corsConfig))
mongoDBConnect();




io.on('connection', (socket)=>{
    console.log('new connection')

    socket.on('setup', (userData)=>{
        socket.join(userData.id)
        // to user notifying successfully connected
        socket.emit('connected')
    })

    socket.on('typing', (room)=>{
        socket.in(room).emit('typing');
    })

    socket.on('stop typing', (room)=>{
        socket.in(room).emit('Stop Typing');
    })

    socket.on('new message', (newMessageRecieve)=>{
        var chat= newMessageRecieve.chatId;
        if(!chat.users){
            console.log("chat.users is not defined")
        }

        // sending the message to all the users in the chat List
        chat.users.forEach((user)=>{
            if(user._id === newMessageRecieve.sender._id){
                return;
            }
            //sending the message in the particular room ie to the particular user
            socket.in(user._id).emit("message recieved", newMessageRecieve)
        });
    });

    socket.on('join-room', (roomId, userId)=>{
        socket.join(roomId);
        socket.to(roomId).emit('user-connected', userId);
    });

    // for sending the messages within the room
    socket.on('message',()=>{
        io.to(roomId).emit('createMessage', message);
    })

    socket.on('disconnect', ()=>{
        socket.to(roomId).broadcast.emit('user-disconnected', userId);
    })
});

server.listen(process.env.PORT, ()=>{
    console.log(`Server is listening on the port ${process.env.PORT}`)
})
