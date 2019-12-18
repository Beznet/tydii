import Link from 'next/link';
import { Col, Row } from 'reactstrap'

const linkStyle = {
  marginRight: 15
};

const Header = () => (
    <Row className='border-bottom'>
      <Col>
      </Col>
      <Col className='text-center'>
        <h1>Tydi App</h1>
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
);

export default Header;