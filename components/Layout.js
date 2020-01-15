import { Container } from 'reactstrap';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => (
  <>
    <Container className="container pt-3">
      <Header />
      {children}
    </Container>
    <Footer />
  </>
);

export default Layout;
