// src/Context/CartContext.jsx

import { createContext, useState } from 'react';
import { getProductData } from '../Data/Items.js'; 

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => 0,
    addToCart: () => {},
    removeItemFromCart: () => {},
    deleteFromCart: () => {},
    getTotalAmount: () => 0,
    clearCart: () => {},
});

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]); 

    function getProductQuantity(id) {
        const item = cartItems.find(product => product.id === id);
        return item ? item.quantity : 0;
    }

    function addToCart(id) {
        const quantity = getProductQuantity(id); 
        if (quantity === 0) {
            setCartItems([...cartItems, { id: id, quantity: 1 }]);
        } else {
            setCartItems(
                cartItems.map(product => 
                    product.id === id ? { ...product, quantity: product.quantity + 1 } : product
                )
            );
        }
    }

    function removeItemFromCart(id) {
        const quantity = getProductQuantity(id);
        if (quantity === 1) {
            deleteFromCart(id);
        } else {
            setCartItems(
                cartItems.map(product => 
                    product.id === id ? { ...product, quantity: product.quantity - 1 } : product
                )
            );
        }
    }

    function deleteFromCart(id) {
        setCartItems(cartItems.filter(product => product.id !== id));
    }

    function getTotalAmount() {
        let totalAmount = 0;
        cartItems.forEach((cartItem) => {
            const productData = getProductData(cartItem.id); 
            if (productData) {
                totalAmount += (productData.price * cartItem.quantity);
            }
        });
        return totalAmount;
    }
    
    function clearCart() {
        setCartItems([]);
    }

    const contextValue = {
        items: cartItems, 
        getProductQuantity,
        addToCart,
        removeItemFromCart,
        deleteFromCart,
        getTotalAmount,
        clearCart,
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}