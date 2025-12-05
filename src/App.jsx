import { Route, Routes } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import { Container } from 'react-bootstrap';
import Shop from './pages/Shop';
import Success from './pages/Success';
import { CartProvider } from './Context/CartContext';

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Container className="mb-5 py-4">
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/success' element={<Success />} />
        </Routes>
      </Container>
    </CartProvider>
  );
}

export default App;