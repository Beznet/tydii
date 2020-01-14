import { Container } from 'reactstrap';
import Header from './Header';

const Layout = ({ children }) => (
  <Container className="pt-3">
    <Header />
    {children}
  </Container>
);

export default Layout;
