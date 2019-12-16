import Link from 'next/link';
import { Col, Row } from 'reactstrap'

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <Col>
    <Row className='border-bottom'>
      <Col>
        <h3>Min App</h3>
      </Col>
      <Col className='text-right'>
        <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/about">
          <a style={linkStyle}>About</a>
        </Link>
      </Col>
    </Row>
  </Col>
);

export default Header;