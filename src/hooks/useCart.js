/**
 * Los hooks son funciones que permiten reutilizar lógica de estado y efectos secundarios en componentes funcionales de React.
 * useCart es un hook personalizado que maneja el estado del carrito de compras, permitiendo
 */
import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";

//!Estos custom hooks funcionan como isntancias, como si se crearan dos carritos separados, para solucionar esto
//!con una instancia se estan creando nuevos objetos y por ende la app desfazada, para esto
//** Se debe tener una unica instancia del carrito de compras */

export const useCart = () => {
  //! Nota: Siempre que se maneje useEffect, es necesario un initial, se le da al state del objeto
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  //!Nota: el state es asincrono, por qué? porque si no fuera asincrono sería más lento
  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  //*Nota: useEffet es similar al watch en vue.js
  useEffect(() => {
    console.log("guardando en el local storage...");
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExist >= 0) {
      if (cart[itemExist].quantity >= MAX_ITEMS) {
        return;
      }
      // cart[itemExist].quantity++; //!Esto está mal porque los states son inmutables

      //*A continuación se muestra la forma correcta justo debajo
      const updatedCart = [...cart]; //Copia del carrito
      updatedCart[itemExist].quantity++;
      setCart(updatedCart);
      return;
    }

    item.quantity = 1;
    setCart([...cart, item]);
    // setCart((prevCart) => [...prevCart, item]); //* esto es lo mismo que lo de arriba
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id != id));
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    setCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    setCart(updatedCart);
  }

  function clearCart() {
    setCart([]);
  }

  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    isEmpty,
    cartTotal
  };
};
