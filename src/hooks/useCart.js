import React from "react";
import AppContext from "../context";

export const useCart = () => {
  const { cartBooks, setCartBooks } = React.useContext(AppContext);
  const totalPrice = cartBooks.reduce((sum, book) => book.price + sum, 0);

  return { cartBooks, setCartBooks, totalPrice };
}