import { useContext, useMemo, useState } from "react";
import { Navbar as NavbarBs, Button, Modal, Badge } from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import CartProduct from "./cartProduct"; 
// ایمپورت توابع SweetAlert2
import { showConfirmAlert, showSuccessAlert } from "../utils/Alerts"; 

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

  // منطق تکمیل خرید با SweetAlert2
  const handleCheckout = async () => {
    // 1. نمایش هشدار تأیید نهایی خرید
    const isConfirmed = await showConfirmAlert(
        "تأیید نهایی خرید",
        `مبلغ کل ${cart.getTotalAmount().toLocaleString()} تومان است. آیا ادامه می‌دهید؟`
    );

    if (isConfirmed) {
      // 2. بستن مودال سبد خرید
      handleClose(); 

      // 3. نمایش پیغام موفقیت SweetAlert2 و صبر کردن برای بسته شدن آن
      await showSuccessAlert(
        "پرداخت موفقیت آمیز بود!",
        "سفارش شما با موفقیت ثبت شد و در حال پردازش است."
      );
      
      // 4. خالی کردن سبد خرید
      cart.clearCart(); 

      // 5. هدایت به صفحه Success
      navigate('/success'); 
    }
  };

  return (
    // navbar-glass برای افکت شیشه‌ای و sticky="top" برای چسبیدن به بالا
    <NavbarBs sticky="top" className="navbar-glass">
      <div className="container d-flex justify-content-between align-items-center">
        
        {/* عنوان قابل کلیک برای بازگشت به صفحه اصلی */}
        <h3 
            className="mb-0 text-white fw-bold navbar-brand-clickable"
            onClick={() => navigate("/")} 
        >
           MySHOP
        </h3>
        
        <Button onClick={handleShow} className="btn-modern position-relative">
          <AiOutlineShoppingCart size={24} className="text-white" />
          {productCount > 0 && (
            <Badge 
                pill 
                bg="danger" 
                className="position-absolute top-0 start-100 translate-middle"
                style={{fontSize: '0.65rem'}}
            >
              {productCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* --- Cart Modal --- */}
      <Modal 
        show={showModal} 
        onHide={handleClose} 
        dir="rtl" 
        centered 
        contentClassName="modal-content" // کلاس سفارشی برای استایل تیره و گلس
      >
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title className="text-white fw-bold">سبد خرید شما</Modal.Title>
        </Modal.Header>

        <Modal.Body className="pb-4">
          {cart.items.length > 0 ? (
            <>
              <div className="d-flex flex-column gap-3 mb-4">
                {cart.items.map((item) => (
                  // کامپوننت آیتم سبد خرید بهینه شده
                  <CartProduct key={item.id} id={item.id} quantity={item.quantity} />
                ))}
              </div>

              {/* نمایش مبلغ کل در یک ردیف گلس (glass-row) */}
              <div className="glass-row py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-sec">مبلغ قابل پرداخت</span>
                  <span className="fw-bold fs-5 text-white">
                    {cart.getTotalAmount().toLocaleString()} <span className="fs-6 text-sec">تومان</span>
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
              </div>
            </>
          ) : (
            // حالت سبد خرید خالی
            <div className="text-center py-5">
              <AiOutlineShoppingCart size={60} className="text-sec opacity-25 mb-3" />
              <h5 className="text-white mb-2">سبد خرید خالی است</h5>
              <p className="text-sec small mb-4">می‌توانید محصولات جذابی را به سبد خود اضافه کنید.</p>
              <Button onClick={handleClose} variant="outline" className="btn-modern">
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