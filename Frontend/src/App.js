import React from 'react'
import { Route,Routes } from 'react-router-dom'

import Home from "./Page/Home"
import GiveService from './Page/GiveService'
import TakeService from './Page/TakeService'
import Login from './Page/Login'
import Signup from './Page/Signup'
import SendOTP from './Page/SendOTP'

const App = () => {
  return (
    
   <div >
    
    <Routes>
    <Route path='/login' element={<Login></Login>}>
    </Route>
    <Route path='/signup' element={<Signup></Signup>}>
    </Route>
      <Route path='/' element={<Home></Home>}>
    </Route>
    <Route path='/giveservice' element={<GiveService></GiveService>}>
    </Route>
    <Route path='/takeservice' element={<TakeService></TakeService>}>
    </Route>
    <Route path='/sendotp' element={<SendOTP></SendOTP>}>
    </Route>
    
    
    
    </Routes>
    
   </div>
  )
}

export default App
