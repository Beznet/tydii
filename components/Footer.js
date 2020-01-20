import Link from 'next/link';
import { Col, Row } from 'reactstrap';

const Footer = () => (
  <Row className="mb-2 no-gutters" id="footer">
    <Col className="ml-3" sm="3">
      <Link href="/about">
        <a>about</a>
      </Link>{' '}
      |{' '}
      <Link href="https://github.com/Beznet/min-app">
        <a>github</a>
      </Link>
    </Col>
  </Row>
);

export default Footer;
