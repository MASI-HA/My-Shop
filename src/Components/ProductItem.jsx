import { Card, Button } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai"; 

function ProductItem({ product }) {
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(product.id);

  return (
    <Card className="custom-card">
      <Card.Img
        variant="top"
        src={product.image}
        className="card-img-top"
        loading="lazy"
      />

      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
            <Card.Title className="text-white mb-2 fs-5"> 
            {product.title}
            </Card.Title>

            <Card.Text className="text-sec mb-4" dir="rtl"> 
            {product.price.toLocaleString()}{" "}
            <span className="fs-6 opacity-75">تومان</span>
            </Card.Text>
        </div>

        <div className="mt-auto">
          {productQuantity > 0 ? (
            <div className="d-flex flex-column gap-2">
              <div className="d-flex align-items-center justify-content-between bg-dark rounded-3 p-1 border border-secondary">
                  <Button
                    onClick={() => cart.addItemToCart(product.id)}
                    className="btn-count" 
                  >
                    <AiOutlinePlus size={20}/>
                  </Button>
                  
                  <span className="fw-bold text-white px-3 fs-5">
                    {productQuantity}
                  </span>

                  <Button
                    onClick={() => cart.removeItemFromCart(product.id)}
                    className="btn-count" 
                  >
                    <AiOutlineMinus size={20}/>
                  </Button>
              </div>

              <Button
                onClick={() => cart.deleteFromCart(product.id)}
                variant="outline"
                size="sm"
                className="w-100 btn-modern btn-danger-custom"
              >
                <AiOutlineDelete size={18} className="me-1"/>
                حذف از سبد
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => cart.addItemToCart(product.id)}
              className="w-100 btn-modern btn-secondary-action" 
              // 👈 از کلاس جدید و بهینه شده استفاده شد
            >
              افزودن به سبد
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductItem;