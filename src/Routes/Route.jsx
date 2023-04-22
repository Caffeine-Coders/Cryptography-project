import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom';

export default function Path() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>SAFESEND</h1>}/>
          <Route path="/check" element={<h1>ROUTECHECK</h1>}/>
        </Routes>
    </BrowserRouter>
  )
}
