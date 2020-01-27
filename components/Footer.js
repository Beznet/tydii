import Link from 'next/link';
import { Col, Row } from 'reactstrap';

const Footer = () => (
  <Row className="mb-2" id="footer">
    <Col className="ml-3 align-items-start w-100" xs="6">
      <Link href="/about">
        <a>
          <img alt="question-mark" src="./question.png" />
        </a>
      </Link>
      <Link href="https://github.com/Beznet/min-app">
        <a>
          <img alt="github-logo" src="./github.png" />
        </a>
      </Link>
      <Link href="https://www.paypal.me/bennettdungan1">
        <a>
          <img alt="donation-link" src="./coffee-cup.png" />
        </a>
      </Link>
    </Col>
  </Row>
);

export default Footer;
