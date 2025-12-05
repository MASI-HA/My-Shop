import { createContext, useState, useEffect } from "react";
import { getProductData } from "../Data/Items";

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  deleteFromCart: () => {},
  clearCart: () => {},
  getTotalAmount: () => {},
});

export function CartProvider({ children }) {
  // دریافت اطلاعات اولیه از LocalStorage (بهینه شده)
  const [cartProducts, setCartProducts] = useState(() => {
    // از تابع برای مقداردهی اولیه استفاده می‌شود تا فقط یک بار اجرا شود
    try {
      const localData = localStorage.getItem("cartItems");
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return [];
    }
  });

  // ذخیره در LocalStorage هر زمان که سبد خرید تغییر کرد
  useEffect(() => {
    try {
        localStorage.setItem("cartItems", JSON.stringify(cartProducts));
    } catch (error) {
        console.error("Error writing to localStorage:", error);
    }
  }, [cartProducts]);

  function getProductQuantity(id) {
    const quantity = cartProducts.find((item) => item.id === id)?.quantity;
    return quantity === undefined ? 0 : quantity;
  }

  function addItemToCart(id) {
    const quantity = getProductQuantity(id);
    if (quantity === 0) {
      setCartProducts([...cartProducts, { id: id, quantity: 1 }]);
    } else {
      setCartProducts(
        cartProducts.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  }

  function deleteFromCart(id) {
    setCartProducts(cartProducts.filter((item) => item.id !== id));
  }

  function removeItemFromCart(id) {
    const quantity = getProductQuantity(id);
    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  }

  function clearCart() {
    setCartProducts([]);
  }

  function getTotalAmount() {
    let totalAmount = 0;
    cartProducts.forEach((item) => {
      const productData = getProductData(item.id);
      if (productData) {
        totalAmount += productData.price * item.quantity;
      }
    });
    return totalAmount;
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addItemToCart,
    removeItemFromCart,
    deleteFromCart,
    clearCart,
    getTotalAmount,
    // همچنین می‌توانستیم یک setter برای تغییر مستقیم سبد خرید اضافه کنیم:
    // setCartProducts
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}