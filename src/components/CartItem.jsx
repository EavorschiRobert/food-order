import React, { useContext } from 'react'
import Button from './UI/Button'
import { currencyFormatter } from '../utils/formatting'
import { CartContext } from '../context/CartContext'

function CartItem({item}) {
  const {addItem, removeItem} = useContext(CartContext);

  const handleAddItem = (item) => {
    addItem(item);
  }
  const handleRemoveItem = (id) => {
    removeItem(id);
  }
  return (
    <li className='cart-item'>
      <p>
        {item.name} - {item.quantity} x {currencyFormatter.format(item.price)}
      </p>
      <p className='cart-item-actions'>
        <button onClick={() => handleRemoveItem(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => handleAddItem(item)}>+</button>
      </p>
    </li>
  )
}

export default CartItem