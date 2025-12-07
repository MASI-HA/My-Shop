// src/App.jsx

import React, { Suspense } from 'react'; 
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Success from './pages/Success'; 

const ShopPage = React.lazy(() => import('./pages/Shop')); 

function App() {
  return (
    <>
      <Navbar />
      
      <div className="container py-5">
        <Suspense fallback={
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h5 className="text-muted mt-3">در حال بارگذاری فروشگاه...</h5>
          </div>
        }>
          <Routes>
            <Route path="/" element={<ShopPage />} /> 
            <Route path="/success" element={<Success />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;