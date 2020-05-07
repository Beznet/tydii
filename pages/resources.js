import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import Layout from '../components/Layout'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Resources() {
  return (
    <Layout>
      <Row>
        <Col sm="6">
          <h3 className="text-center">I want to donate my stuff</h3>
          <ListGroup>
            <ListGroupItem tag="a" href="https://satruck.org/" action>
              Salvation Army donation centers and drop offs
            </ListGroupItem>
            <ListGroupItem
              tag="a"
              href="https://www.habitat.org/stories/does-habitat-offer-furniture-donation-pickup"
              action
            >
              {' '}
              Schedule a Habitate for Humanity furniture pickup
            </ListGroupItem>
            <ListGroupItem
              tag="a"
              href="https://thearc.org/get-involved/ways-give/donate-physical-items/"
              action
            >
              {' '}
              The Arc donation centers
            </ListGroupItem>
            <ListGroupItem
              tag="a"
              href="https://www.charitynavigator.org/index.cfm?bay=content.view&cpid=335"
              action
            >
              {' '}
              Guide to donating non-cash items
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col sm="6" className="mt-3 mt-sm-0">
          {' '}
          <h3 className="text-center">I want to sell my stuff</h3>
          <ListGroup>
            <ListGroupItem
              tag="a"
              href="https://www.ebay.com/help/selling/selling-guides-tips/selling?id=4081"
              action
            >
              Ebay beginners selling guide
            </ListGroupItem>
            <ListGroupItem
              tag="a"
              href="https://www.facebook.com/marketplace/learn-more/"
              action
            >
              {' '}
              Facebook Marketplace selling guide
            </ListGroupItem>
            <ListGroupItem tag="a" href="https://poshmark.com/" action>
              {' '}
              Poshmark: Sell your clothes online
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </Layout>
  )
}
