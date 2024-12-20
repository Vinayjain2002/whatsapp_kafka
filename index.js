import express from 'express'
import  dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import http from 'http'
import {Server} from 'socket.io'
import userRoutes from './routes/user.js'
import chatRoutes from './routes/chat.js'
import messageRoutes from './routes/message.js'
import videoCallRoutes from './routes/videoCall.js'
import audioCallRoutes from './routes/audioCall.js'
import fileRoutes from './routes/file.js'

// used for the peer to peer connection for the WebRTC for the audio, video.
import {ExpressPeerServer} from 'peer'
import mongoDBConnect  from './Connection/mongoDB/mongooseConnection.js';

const app= express()
dotenv.config();
const corsConfig={
    origin: process.env.BASE_URL,
    credentials: true
};
const server= http.createServer(app)
const io= new Server(server,{
    cors: true
})
const peerServer= ExpressPeerServer(server, {
    debug: true
});

app.use('/peerja', peerServer);
// app.set('view engine', 'ejs')

// for serving the static files
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cors(corsConfig))
app.use('/',userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/file', fileRoutes)
app.use('/api/video', videoCallRoutes)
app.use('/api/audio', audioCallRoutes);

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

    // used for the connection to the Other user where the user try to connect with each other using room
    socket.on('join-room', (roomId, userId)=>{
        socket.join(roomId);
        // send the message to the users that the user has joined the room
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
