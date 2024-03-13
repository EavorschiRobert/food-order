import { createContext, useState } from "react";

export const CartContext = createContext({
  cartItems: [],
  cartSize: 0,
  handleItemAdd: () => {},
  showModal: false,
  handleModal: () => {},
  handleItemRemove: () => {},
  showModalCheck: false,
  handleModalCheck: () => {}
});

const CartContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [size, setSize] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  const removeItem = (name, id, price) => {
    setItems((prevState) => ({
        ...prevState,
        [name]: {
          id: id,
          price: price,
          qt: items[name].qt - 1,
        },
      }));
      setSize((prevState) => prevState - 1);
  }
  const handleItemAdd = (name, id, price) => {
    if (items[name] === undefined) {
      setItems((prevState) => ({
        ...prevState,
        [name]: {
          id: id,
          price: price,
          qt: 1,
        },
      }));
    } else {
      setItems((prevState) => ({
        ...prevState,
        [name]: {
          id: id,
          price: price,
          qt: items[name].qt + 1,
        },
      }));
    }
    setSize((prevState) => prevState + 1);
  };

  const handleShowModal = () => {
    setShowModal((prevState) => !prevState);
  };
  const handleModalCheck = () => {
    setShowCheck((prevState) => !prevState);
  };
  const contextStart = {
    cartItems: items,
    handleAdd: handleItemAdd,
    cartSize: size,
    showModal: showModal,
    handleModal: handleShowModal,
    handleRemove: removeItem,
    showModalCheck: showCheck,
    handleModalCheck: handleModalCheck,
  };
  return (
    <CartContext.Provider value={contextStart}>{children}</CartContext.Provider>
  );
};
export default CartContextProvider;
