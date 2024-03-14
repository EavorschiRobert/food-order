import { createContext, useReducer } from "react";
import React from "react";

export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const updatedItems = [...state.items];
      if (existingCartItemIndex > -1) {
        const existingItem = state.items[existingCartItemIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems.push({ ...action.item, quantity: 1 });
      }
      return { ...state, items: updatedItems };

    case "REMOVE_ITEM":
      const existingCartItemIndexRemove = state.items.findIndex(
        (item) => item.id === action.id
      );

      const existingItemRemove = state.items[existingCartItemIndexRemove];

      const updatedItemsRemove = [...state.items];
      if (existingItemRemove.quantity === 1) {
        updatedItemsRemove.splice(existingCartItemIndexRemove, 1);
      } else {
        const updatedItemRemove = {
          ...existingItemRemove,
          quantity: existingItemRemove.quantity - 1,
        };
        updatedItemsRemove[existingCartItemIndexRemove] = updatedItemRemove;
      }
      return { ...state, items: updatedItemsRemove };
    default:
      return state;
  }
}

function CartContextProvider({ children }) {
  const [cart, dispatchCartAction ] = useReducer(cartReducer, { items: [] });


  const handleAddItem = (item) => {
    dispatchCartAction({type: 'ADD_ITEM', item})
  }
  const handleRemoveItem = (id) => {
    dispatchCartAction({type: 'REMOVE_ITEM', id})
  }

  const cartContextValue = {
    items: cart.items,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
  };
  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
