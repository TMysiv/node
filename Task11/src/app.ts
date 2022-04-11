import express from 'express';
import http from 'http';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import SocketIO from 'socket.io';

import { apiRouter } from './routes/apiRouter';
import { config } from './config/config';
import { cronRun } from './cron';
import { chatsRepository } from './repository/chats/chatsRepository';
import { IChats } from './entity';

const app = express();
const server = http.createServer(app);

// @ts-ignore
const io = SocketIO(server, { cors: { origin: '*' } });

io.on('connection', (socket: any) => {
    socket.on('join_room', (data: any) => {
        socket.join(data.nameRoom);
        io.to(data.nameRoom).emit('user_join_room', { message: `User ${socket.id} joined room ${data.nameRoom}` });

        socket.on('send message', (message: any) => {
            io.to(data.nameRoom).emit('new message', message);
            const newMessage = { user: socket.id, text: message.text, chat: data.nameRoom } as IChats;
            chatsRepository.sendMessage(newMessage);
        });
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

// @ts-ignore
global.rootDir = __dirname;

server.listen(config.PORT, async () => {
    console.log(`Server has started!!!!!! on PORT:${config.PORT}`);
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('DATABASE Connect');
        }
        await cronRun();
    } catch (err) {
        if (err) {
            console.log(err);
        }
    }
});
