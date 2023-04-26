import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Home } from '../home/Home';
import { CoverPage } from '../cover/Cover';
import { Intro } from '../infopage/intro';
import { LoginPage } from '../login/login';

export default function Path() {
  return (
    <BrowserRouter>
        <Routes>
          {/* intro contains the ecc information page */}
          <Route path="/intro" element={<Intro/>}/>
          <Route path='/login' element={<LoginPage/>}/>
        <Route path="/" element={<CoverPage/>}/>
        <Route path="/chat" element={<Home/>}/>
          <Route path="/check" element={<h1>ROUTECHECK</h1>}/>
        </Routes>
    </BrowserRouter>
  )
}