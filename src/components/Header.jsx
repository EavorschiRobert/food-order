import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/logo.jpg'
import { CartContext } from '../context/CartContext';

function Header() {
  const {cartSize, handleModal} = useContext(CartContext);

  return (
    <div className='header'>
        <div className='title'>
            <img src={logo} alt='logo'/>
            <h1>REACTFOOD</h1>
        </div>
        <button className='cart' onClick={handleModal}>
          Cart {cartSize === 0 ? '' : ` (${cartSize})`}
        </button>
    </div>
  )
}

export default Header