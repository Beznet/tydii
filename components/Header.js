import { Col, Row } from 'reactstrap';

const Header = () => (
  <Row className="header-border mb-4">
    <Col sm="3"></Col>
    <Col className="title text-center" sm="6">
      <h1>Tydi App</h1>
    </Col>
    <Col sm="3"></Col>
  </Row>
);

export default Header;
