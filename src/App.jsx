
import Header from "./components/Header";
import Meals from "./components/Meals";
import CartContextProvider from "./context/CartContext";
import Cart from "./components/Cart";

function App() {

  return (
    <CartContextProvider>
      <Cart />
      <Header/>
      <Meals />
    </CartContextProvider>
  );
}

export default App;
