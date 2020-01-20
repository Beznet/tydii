import { Col, Row } from 'reactstrap';

const Header = () => (
  <Row className="mb-2 mt-sm-2">
    <Col sm="3"></Col>
    <Col className="text-center" sm="6">
      <h1 className="title">Tydii</h1>
    </Col>
    <Col sm="3"></Col>
  </Row>
);

export default Header;
