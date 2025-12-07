// src/pages/Success.jsx

import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsCheckCircleFill, BsBagCheckFill } from "react-icons/bs";
import { useState } from "react";

function Success() {
  const navigate = useNavigate();
  const trackingCode = "#SH-1234-ABCD";
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  if (isLoading) {
    return (
      <div className="success-page d-flex flex-column align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h4 className="text-white mt-3">در حال انتقال به فروشگاه...</h4>
      </div>
    );
  }

  return (
    <div className="success-page">
      <div className="success-card">
        {/* LOGO */}
        <div className="d-flex align-items-center gap-2 mb-4">
          <BsBagCheckFill size={30} style={{ color: "var(--accent)" }} />
          <span className="fw-bold fs-5" style={{ color: "var(--accent)" }}>
            My.Shop
          </span>
        </div>

        {/* ICON */}
        <div className="success-icon icon-glow-bounce mb-3">
          <BsCheckCircleFill />
        </div>

        {/* TITLE */}
        <h1 className="success-title fs-2 fw-bold text-white mb-2 text-center">
          سفارش شما ثبت شد!
        </h1>

        {/* SUBTITLE */}
        <p className="success-subtitle text-sec mb-5 text-center">
          از خرید شما متشکریم. سفارش شما با موفقیت ثبت شد.
        </p>

        {/* DETAIL BOX */}
        <div className="detail-box mb-4">
          <div className="d-flex justify-content-between mb-2">
            <span className="text-sec small">کد پیگیری</span>
            <span className="fw-bold text-white">{trackingCode}</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="success-actions d-flex flex-column justify-content-center w-100">
          <Button
            className="btn-modern btn-primary-custom btn-lg w-100 mb-3"
            onClick={handleNavigate}
          >
            بازگشت به فروشگاه
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Success;