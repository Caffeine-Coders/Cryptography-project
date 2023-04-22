import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Home } from '../home/Home';

export default function Path() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/check" element={<h1>ROUTECHECK</h1>}/>
        </Routes>
    </BrowserRouter>
  )
}
