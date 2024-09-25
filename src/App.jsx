import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Loginpage from './Components/Loginpage'
import Dashbord from './Components/Dashbord'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Loginpage />} />
        <Route path='/dashboard' element={<Dashbord />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
