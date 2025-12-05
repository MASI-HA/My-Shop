import { Row, Col } from "react-bootstrap";
import ProductItem from "../Components/ProductItem";
import { productList } from "../Data/Items"; //

function Shop() {
  return (
    // xs=1 (موبایل), sm=2 (تبلت کوچک), md=3 (تبلت بزرگ), lg=4 (دسکتاپ)
    <Row xs={1} sm={2} md={3} lg={4} className="g-4"> 
      {productList.map((item) => (
        // برای نمایش ۴ ستون در lg و md و...، Col باید 3 واحد از 12 واحد را اشغال کند
        <Col xs={12} sm={6} md={4} lg={3} align="center" key={item.id}>
          <ProductItem product={item} />
        </Col>
      ))}
    </Row>
  );
}

export default Shop;