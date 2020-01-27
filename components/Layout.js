import { Container, Row } from 'reactstrap';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css';

const Layout = ({ children }) => (
  <>
    <Container className="container pt-3 clearfix">
      <base target="_blank" />
      <Header />
      {children}
      <Footer />
    </Container>
  </>
);

export default Layout;
