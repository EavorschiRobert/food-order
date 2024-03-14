import { createContext, useState } from "react";

export const UserContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

const UserProgressContextProvider = ({ children }) => {
  const [progress, setProgress] = useState("");

  const showCart = () => {
    setProgress("cart");
  };
  const hideCart = () => {
    setProgress("");
  };
  const showCheckout = () => {
    setProgress("checkout");
  };
  const hideCheckout = () => {
    setProgress("");
  };

  const initialContext = {
    progress: progress,
    showCart: showCart,
    hideCart: hideCart,
    showCheckout: showCheckout,
    hideCheckout: hideCheckout,
  };

  return <UserContext.Provider value={initialContext}>{children}</UserContext.Provider>;
};
export default UserProgressContextProvider;
