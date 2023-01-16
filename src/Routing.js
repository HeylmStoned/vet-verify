import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import DiscordVerify from './pages/DiscordVerify'

function Routing() {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/verify' element={<DiscordVerify exact/>} />
    </Routes>
  )
}

export default Routing