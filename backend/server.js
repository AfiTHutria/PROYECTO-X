import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server as SocketIOServer } from 'socket.io';
import authRoutes from './src/interfaces/Routes/AuthRoutes.js';
import sessionRoutes from './src/interfaces/Routes/SessionRoutes.js';
import cookieParser from 'cookie-parser';
import PublicacionRoutes from './src/interfaces/Routes/PublicacioRoutes.js';
import { setIO } from './src/infrastructure/realtime/socket.js';
import usuariosRoutes from './src/interfaces/Routes/UsuariosRoutes.js';

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/session', sessionRoutes);
app.use('/api/publicaciones', PublicacionRoutes);
app.use('/api/usuarios', usuariosRoutes);

const server = http.createServer(app);

const io = new SocketIOServer(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true,
    },
});

setIO(io);

io.on('connection', (socket) => {
    socket.join('feed');

    socket.on('publicacion:join', ({ publicacionIdRaiz }) => {
        if (!publicacionIdRaiz) return;
        socket.join(`publicacion:${publicacionIdRaiz}`);
    });

    socket.on('publicacion:leave', ({ publicacionIdRaiz }) => {
        if (!publicacionIdRaiz) return;
        socket.leave(`publicacion:${publicacionIdRaiz}`);
    });
});

server.listen(3000, () => {
    console.log('Backend corriendo');
});

