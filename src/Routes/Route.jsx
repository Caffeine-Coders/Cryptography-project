import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Home } from '../home/Home';
import { CoverPage } from '../cover/Cover';
import { Ecc } from '../infopage/info';

export default function Path() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<CoverPage/>}/>
        <Route path="/info" element={<Ecc/>}/>
        <Route path="/chat" element={<Home/>}/>
          <Route path="/check" element={<h1>ROUTECHECK</h1>}/>
        </Routes>
    </BrowserRouter>
  )
}
