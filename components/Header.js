import { Col, Row } from 'reactstrap';
import Title from './Title';
import LoginForm from './login';
import SignupForm from './SignUp';

const Header = () => (
  <Row className="mb-2 mt-sm-2">
    <Col sm="3"></Col>
    <Col className="text-center" sm="6">
      <Title copy="Tydii" role="heading" />
      <LoginForm />
      <SignupForm />
    </Col>
    <Col sm="3"></Col>
  </Row>
);

export default Header;
