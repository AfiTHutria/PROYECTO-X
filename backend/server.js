import express from 'express';
import cors from 'cors';
import authRoutes from './src/interfaces/Routes/AuthRoutes.js';
import sessionRoutes from './src/interfaces/Routes/SessionRoutes.js';
import { SupabaseUsuarioRepository } from './src/infrastructure/repository/SupabaseUsuarioRepository.js';
import cookieParser from 'cookie-parser';
import PublicacionRoutes from './src/interfaces/Routes/PublicacioRoutes.js';

const app=express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/session', sessionRoutes);
app.use('/api/publicaciones', PublicacionRoutes); 


app.listen(3000,()=>{
    console.log('Backend corriendo');
    
});


