import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Routes, Route } from "react-router-dom";

import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'

import Start from "./pages/Start.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Error from "./pages/Error.tsx";
import FlashcardCreate from './pages/FlashcardCreate.tsx';
import Study from './pages/Study.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
            <Route path="/" element={<Start/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/flashcard/create" element={<FlashcardCreate/>}/>
            <Route path="/flashcard/edit/:set_id" element={<Error/>} /> 
            <Route path="/flashcard/study/:set_id" element={<Study/>} /> 
            <Route path="*" element={<Error/>} />
      </Routes>
      <Analytics/>
    </BrowserRouter>
  </React.StrictMode>,
)