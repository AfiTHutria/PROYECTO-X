import React from 'react'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import '../src/App.css'



export default function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home></Home>} />



            </Routes>
        </>
    )
}
