import Link from 'next/link';
import { Col, Row } from 'reactstrap';

const linkStyle = {
  marginRight: 15,
};

const Header = () => (
  <Row className="border-bottom">
    <Col sm="3"></Col>
    <Col className="text-center" sm="6">
      <h1>Tydi App</h1>
    </Col>
    <Col className="text-right" sm="3">
      <Link href="/">
        <a style={linkStyle}>Home</a>
      </Link>
      <Link href="/about">
        <a style={linkStyle}>About</a>
      </Link>
    </Col>
  </Row>
);

export default Header;
