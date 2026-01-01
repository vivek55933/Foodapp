import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import Placeorder from './pages/Placeorder/Placeorder'
import Home from './pages/Home/Home'
import FoodDisplay from './components/FoodDisplay/FoodDisplay'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'

const App = () => {
  const[showLogin,setShowLogin]=useState(false);
  return (
      <>
      {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
        <Navbar setShowLogin={setShowLogin}/>
         <div className='app'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/placeorder' element={<Placeorder />} />
        </Routes>
        </div>
        <Footer />
      </>
  )
}

export default App