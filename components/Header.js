import { Col, Row } from 'reactstrap';
import Title from './Title';
import Link from 'next/link';

const Header = () => (
  <Row className="mb-2 mt-sm-2">
    <Col sm="3"></Col>
    <Col className="text-center" sm="6">
      <Link href='/' >
        <a className='text-decoration-none'><Title copy="Tydii" role="heading" /></a>
      </Link>
    </Col>
    <Col sm="3">
    </Col>
  </Row>
);

export default Header;
