import Link from 'next/link';
import { Col, Row } from 'reactstrap';

const Footer = () => (
  <Row id="footer" className="mb-2">
    <Col className="ml-3" sm="3">
      <Link href="/about">
        <a>about</a>
      </Link>{' '}
      |{' '}
      <Link href="https://github.com/Beznet/min-app">
        <a>github</a>
      </Link>
    </Col>
    <Col sm="6"></Col>
    <Col sm="3"></Col>
  </Row>
);

export default Footer;
