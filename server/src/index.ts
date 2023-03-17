import express, { Express, Request, Response } from 'express';
import { Server, Socket } from 'socket.io'
import {
    ClientToServerEvents,
    ServerToClientEvents
} from './types/types';

const http = require('http');
const cors = require('cors');
const route = require('./route');
const { addUser, findUser, countUserRoom, leftUser } = require('./users');

const app: Express = express();

app.use(cors({ origin: '*'}));
app.use(route)

const server = http.createServer(app);

const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents
>(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
    },
});

io.on('connection', (socket) => {
    socket.on('join', (newUser) => {
        socket.join(newUser.room); 
        const { user, isExist } = addUser(newUser);
        if (!isExist) {
            socket.emit('message', {
                user: {name: 'Admin'}, message: `Hi ${user.name}`
            });
            socket.broadcast.to(user.room).emit('message', {
                user: {name: 'Admin'}, message: `${user.name} has joined`
            });
            io.to(user.room).emit('updateCountUser', countUserRoom(user.room));
        } else {
            socket.emit('message', {
                user: {name: 'Admin'}, message: `${user.name}, you are with us again`
            });
            socket.broadcast.to(user.room).emit('message', {
                user: {name: 'Admin'}, message: `${user.name} is with us again`
            });
        }
    });
    socket.on('leftRoom', (user) => {
        leftUser(user);
        socket.broadcast.to(user.room).emit('updateCountUser', countUserRoom(user.room));
        socket.broadcast.to(user.room).emit('message', {
            user: {name: 'Admin'}, message: `${user.name} left the room`
        });
    })

    socket.on('sendMessage', ({ message, params }) => {
        const user = params;
        if(user) {
            io.to(user.room).emit('message', { user, message});
        }
    });

    io.on('disconnetction', () => {
        console.log('disconnect');
    });
});

server.listen(5000, () => {
    console.log('server is running...')
})