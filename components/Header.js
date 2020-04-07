import { Col, Row } from 'reactstrap';
import Title from './Title';

const Header = () => (
  <Row className="mb-2 mt-sm-2">
    <Col sm="3"></Col>
    <Col className="text-center" sm="6">
      <Title copy="Tydii" role="heading" />
      Login
      Sign Up
    </Col>
    <Col sm="3"></Col>
  </Row>
);

export default Header;
