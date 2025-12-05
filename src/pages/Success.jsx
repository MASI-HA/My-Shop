import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// حذف آیکون BsCurrencyDollar چون مبلغ کل حذف شده است
import { BsCheckCircleFill, BsTagFill } from "react-icons/bs"; 
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

function Success() {
  const navigate = useNavigate();
  const cart = useContext(CartContext);

  const trackingCode = "SH-1234-ABCD"; 
  
  // اطمینان از خالی شدن سبد پس از موفقیت
  if (cart.items.length > 0) {
    cart.clearCart();
  }

  const hasTrackingCode = trackingCode; 

  return (
    <div className="success-page">
      <div className="success-card">
        
        {/* ICON - انیمیشن iconScaleBounce */}
        <div className="success-icon">
          <BsCheckCircleFill size={36} />
        </div>

        {/* TITLE - انیمیشن تأخیر ۱ */}
        <h1 className="success-title stagger-item animate-delay-1 fs-3 fw-bold text-white mb-2">
          خرید شما با موفقیت ثبت شد
        </h1>

        {/* SUBTITLE - انیمیشن تأخیر ۲ */}
        <p className="success-subtitle stagger-item animate-delay-2 text-sec mb-4">
          کد رهگیری سفارش شما در زیر نمایش داده شده است.
        </p>
        
        {/* --- DETAILS SECTION (فقط کد رهگیری) --- */}
        {hasTrackingCode && (
          <div className="details-section mb-4">
            
            {/* کد رهگیری - انیمیشن تأخیر ۳ */}
            <div className="glass-row-dark d-flex align-items-center justify-content-between stagger-item animate-delay-3">
              <div className="d-flex align-items-center gap-3">
                <BsTagFill size={20} className="text-accent" />
                <span className="text-sec fw-bold">کد رهگیری</span>
              </div>
              <code className="text-main fw-bold">{trackingCode}</code>
            </div>

            {/* مبلغ کل حذف شد */}
          </div>
        )}

        {/* ACTIONS - انیمیشن تأخیر ۴ */}
        <div className="success-actions d-flex flex-column gap-3 justify-content-center stagger-item animate-delay-4">
          <Button
            className="btn-modern btn-primary-custom w-100 py-2"
            onClick={() => navigate("/")}
          >
            بازگشت به فروشگاه
          </Button>

          {/* دکمه مشاهده سوابق سفارش‌ها حذف شد */}
        </div>
      </div>
    </div>
  );
}

export default Success;