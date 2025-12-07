// src/Components/Navbar.jsx

import { useContext, useMemo, useState } from "react";
import { Navbar as NavbarBs, Button, Modal, Badge } from "react-bootstrap";
import { AiOutlineShoppingCart, AiOutlineDelete } from "react-icons/ai";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import CartProduct from "./cartProduct";
import { showConfirmAlert, showSuccessAlert } from "../utils/Alerts"; 
import { BsBagCheckFill } from "react-icons/bs";
import Swal from 'sweetalert2'; 

function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const cart = useContext(CartContext);
  const navigate = useNavigate();

  const productCount = useMemo(
    () => cart.items.reduce((sum, product) => sum + product.quantity, 0),
    [cart.items]
  );

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleCheckout = async () => {
    const isConfirmed = await showConfirmAlert(
      "تأیید نهایی خرید",
      `مبلغ کل ${cart
        .getTotalAmount()
        .toLocaleString()} تومان است. آیا ادامه می‌دهید؟`
    );

    if (isConfirmed) {
      cart.clearCart(); 
      handleClose(); 

      showSuccessAlert("خرید با موفقیت انجام شد!", "سفارش شما در اسرع وقت ارسال خواهد شد.");
      
      // بستن Alert های فعال قبل از ناوبری
      Swal.close(); 
      
      navigate("/success");
    }
  };

  return (
    <NavbarBs
      sticky="top"
      className="navbar-glass py-3 px-4 justify-content-between" 
    >
      <div
        className="d-flex align-items-center gap-2 navbar-brand-clickable"
        onClick={() => navigate("/")}
      >
        <BsBagCheckFill size={30} style={{ color: "var(--accent)" }} />
        <span className="fw-bold fs-5" style={{ color: "var(--accent)" }}>
          My.Shop
        </span>
      </div>

      <Button
        onClick={handleShow}
        className="btn-modern position-relative"
      >
        <AiOutlineShoppingCart size={20} />
        {productCount > 0 && (
          <Badge
            pill
            bg="danger"
            className="position-absolute top-0 start-0 translate-middle"
          >
            {productCount}
          </Badge>
        )}
      </Button>

      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        scrollable
        dir="rtl"
        size="lg"
      >
        <Modal.Header closeButton className="border-secondary">
          <Modal.Title className="text-white">سبد خرید ({productCount} محصول)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productCount > 0 ? (
            <>
              <div className="d-flex flex-column gap-3 mb-4">
                {cart.items.map((item) => (
                  <CartProduct key={item.id} id={item.id} quantity={item.quantity} />
                ))}
              </div>

              <div className="glass-row py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-sec">مبلغ قابل پرداخت</span>
                  <span className="fw-bold fs-5 text-white">
                    {cart.getTotalAmount().toLocaleString()}{" "}
                    <span className="fs-6 text-sec">تومان</span>
                  </span>
                </div>
              </div>

              <div className="d-flex gap-3 mt-4">
                <Button
                  onClick={handleCheckout}
                  className="btn-modern btn-primary-custom flex-grow-1 py-2"
                >
                  تکمیل خرید و پرداخت
                </Button>
                <Button
                  onClick={() => cart.clearCart()}
                  className="btn-modern btn-danger-custom py-2"
                >
                  <AiOutlineDelete size={18} />
                  خالی کردن سبد
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-5">
              <AiOutlineShoppingCart
                size={60}
                className="text-sec opacity-25 mb-3"
              />
              <h5 className="text-white mb-2">سبد خرید خالی است</h5>
              <p className="text-sec small mb-4">
                می‌توانید محصولات را به سبد خود اضافه کنید.
              </p>
              <Button
                onClick={handleClose}
                variant="outline"
                className="btn-modern"
              >
                مشاهده محصولات
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </NavbarBs>
  );
}

export default Navbar;