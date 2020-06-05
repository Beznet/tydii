import {  ListGroup, ListGroupItem } from 'reactstrap'

const Resources = () => {
  return (
    <>
      <h3 className='text-center'>How do I donate?</h3>
      <ListGroup>
        <ListGroupItem
          tag="a"
          href="https://satruck.org/"
          action
        >
          Salvation Army donation centers
        </ListGroupItem>
        <ListGroupItem
          tag="a"
          href="https://www.habitat.org/stories/does-habitat-offer-furniture-donation-pickup"
          action
        >
          Schedule a Habitate for Humanity furniture pickup
        </ListGroupItem>
        <ListGroupItem
          tag="a"
          href="https://thearc.org/get-involved/ways-give/donate-physical-items/"
          action
        >
          The Arc donation centers
        </ListGroupItem>
        <ListGroupItem
          tag="a"
          href="https://www.thebalance.com/tax-deduction-for-charity-donations-3192983"
          action
        >
          TIP: Tax deducations for donations
        </ListGroupItem>
      </ListGroup>
      <h3 className="mt-3 text-center">How do I sell?</h3>
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
          Facebook Marketplace selling guide
        </ListGroupItem>
        <ListGroupItem 
          tag="a" 
          href="https://poshmark.com/" 
          action
        >
          Poshmark: Sell your clothes online
        </ListGroupItem>
        <ListGroupItem 
          tag="a" 
          href="https://www.daveramsey.com/blog/garage-sale-tips" 
          action
        >
          Setting up a yard sale
        </ListGroupItem>
      </ListGroup>
    </>
  )
}

export default Resources