import express from 'express';
import cors from 'cors';
import authRoutes from './src/interfaces/Routes/AuthRoutes.js';

const app=express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(3000,()=>{
    console.log('Backend corriendo');
});