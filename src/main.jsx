// src/main.jsx (یا index.js)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// ایمپورت استایل‌های مورد نیاز
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css'; 

// 👈 ایمپورت و فعال‌سازی CartProvider
import { CartProvider } from './Context/CartContext'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 👈 قرار دادن برنامه درون CartProvider */}
    <CartProvider> 
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);