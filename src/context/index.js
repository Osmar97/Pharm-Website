"use client";

import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [showNavModal, setShowNavModal] = useState(false);
  const [isAuthUser, setIsAuthUser] = useState(null);
  const [pageLevelLoader, setPageLevelLoader] = useState(false);
  const [componentLevelLoader, setComponentLevelLoader] = useState({
    loading: false,
    id: "",
  });
  const [user, setUser] = useState(null);
  const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [addressFormData, setAddressFormData] = useState({
    nomeCompleto: "",
    cidade: "",
    pais: "",
    codigoPostal: "",
    address: "",
  });

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const userData = JSON.parse(Cookies.get("user"));

      setUser(userData);
    } else {
      setIsAuthUser(false);
    }
  }, [Cookies]);

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
        pageLevelLoader,
        setPageLevelLoader,
        componentLevelLoader,
        setComponentLevelLoader,
        currentUpdatedProduct,
        setCurrentUpdatedProduct,
        showCartModal,
        setShowCartModal,
        cartItems,
        setCartItems,
        addresses,
        setAddresses,
        addressFormData,
        setAddressFormData,
      }}
    >
      {" "}
      {children}{" "}
    </GlobalContext.Provider>
  );
}
