// src/pages/Shop.jsx

import { Row, Col, Container } from "react-bootstrap";
import ProductItem from "../Components/ProductItem";
import { productList } from "../Data/Items";

function Shop() {
  return (
    <Container>
      <div className="mb-5 text-center">
        <h1 className="text-white mb-3">فروشگاه My.Shop</h1>
        <p className="text-sec">
          بهترین محصولات با کیفیت عالی را از ما بخواهید
        </p>
      </div>
      
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {productList.map((item) => (
          <Col key={item.id}>
            <ProductItem product={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Shop;