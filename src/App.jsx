import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import Placeorder from './pages/Placeorder/Placeorder'
import Home from './pages/Home/Home'
import FoodDisplay from './components/FoodDisplay/FoodDisplay'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <div className='app'>
      <>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/placeorder' element={<Placeorder />} />
        </Routes>
        <Footer />
      </>
    </div>
  )
}

export default App