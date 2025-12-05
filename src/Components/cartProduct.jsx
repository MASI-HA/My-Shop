import { Button } from "react-bootstrap";
import { getProductData } from "../Data/Items";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { AiOutlineDelete } from "react-icons/ai"; 

function CartProduct({ id, quantity }) {
  const productData = getProductData(id);
  const cart = useContext(CartContext);

  if (!productData) return null;

  return (
    <div className="glass-row d-flex align-items-center justify-content-between" dir="rtl">
        <div className="d-flex align-items-center gap-3">
             <img 
                src={productData.image} 
                alt={productData.title} 
                className="cart-item-image" // 👈 استفاده از کلاس CSS
             />
             <div>
                <h6 className="text-white mb-1 cart-item-title">{productData.title}</h6>
                {/* نمایش واضح‌تر تعداد و قیمت واحد */}
                <p className="text-sec small mb-0">
                    <span className="fw-bold me-1">تعداد: {quantity}</span> 
                    <span className="ms-1">قیمت واحد: {productData.price.toLocaleString()} تومان</span>
                </p>
             </div>
        </div>

      <div className="d-flex flex-column align-items-end gap-2">
        
        {/* نمایش قیمت کل این آیتم */}
        <span className="fw-bold text-white">
          {(quantity * productData.price).toLocaleString()}
          <span className="text-sec small fw-normal me-1">تومان</span>
        </span>
        
        {/* دکمه حذف - لینک استایل، با کلاس CSS بهینه‌شده */}
        <Button
          size="sm"
          // کلاس جدید و بهینه‌شده
          className="btn-remove-cart" 
          onClick={() => cart.deleteFromCart(id)}
        >
          <AiOutlineDelete size={18} className="ms-1"/>
          حذف
        </Button>
      </div>
    </div>
  );
}

export default CartProduct;