import express from 'express';
import cors from 'cors';
import authRoutes from './src/interfaces/Routes/AuthRoutes.js';
import { SupabaseUsuarioRepository } from './src/infrastructure/repository/SupabaseUsuarioRepository.js';
import cookieParser from 'cookie-parser';


const app=express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);


app.listen(3000,()=>{
    console.log('Backend corriendo');
    
});


