import Layout from '../components/Layout'
import React, { useState } from 'react'
import usePersistedState from '../hooks/usePersistedState'
import {
  Col,
  Row,
  UncontrolledDropdown,
  ListGroup,
  ListGroupItem,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Alert,
  Media,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress
} from 'reactstrap'
import useSWR from 'swr'
import useItemState from '../hooks/useItemState'
import useToggle from '../hooks/useToggle'

const DonateSellDropdown = ({ updateItem, item }) => {

  const handleClick = (e) => {
    const result = e.target.value
    updateItem(Object.assign({}, item, { result }))
  }

  const dropdownTitle = item.result

  return (
    <UncontrolledDropdown group size='sm' >
      <DropdownToggle caret>
        {dropdownTitle}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem value='owned' onClick={handleClick}>owned</DropdownItem>
        <DropdownItem value='sold' onClick={handleClick}>sold</DropdownItem>
        <DropdownItem value='donated' onClick={handleClick}>donated</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

const DonateSellResults = ({ items, updateItem }) => (
  <>
    <h2 className='mt-2' >Donate or Sell</h2>
    <hr />
    {
      items.map(item => (
        <Row className="d-flex-inline mb-2">
          <Col className="d-flex-inline" xs='8'>
            <h5>
              {item.result !== 'owned' ? <s>{item.name}</s> : item.name}
            </h5>
          </Col>
          <Col className="d-flex-inline" xs='4'>
            <DonateSellDropdown updateItem={updateItem} item={item} />
          </Col>
        </Row>
      ))
    }
  </>
)

const DonatedItems = ({ donatedArray }) => {
  return (
    <Row className='ds-result-box mb-4'>
      <Col className='mt-2 text-center'>
        <Media className='donation-hands' object src='/donation.png' />
        <hr />
        {
          donatedArray.length === 0 ?
            <div className='placeholder-text mt-5'>
              <h4>Nothing donated yet</h4>
            </div> :
            donatedArray.map(item => <h5 className='item'>{item.name}</h5>)
        }
      </Col>
    </Row>
  )
}

const SoldItems = ({ soldArray }) => {
  return (
    <Row className='ds-result-box'>
      <Col className='mt-2 text-center'>
        <Media className='donation-hands' object src='/money.png' />
        <hr />
        {
          soldArray.length === 0 ?
            <div className='placeholder-text mt-5'>
              <h4>Nothing sold yet</h4>
            </div> :
            soldArray.map(item => <h5 className='item'>{item.name}</h5>)
        }
      </Col>
    </Row>
  )
}

const InstructionsModal = () => {
  const [instructionModal, toggleInstructionModal] = useToggle(false)

  return (
    <Modal centered toggle={toggleInstructionModal} isOpen={instructionModal}>
        <ModalHeader className='justify-content-center'>
          <Row>
            <Col className='d-flex'>
              <h2 className='rid-text'>Time to clean up</h2>
              <Media className='ml-2' object src='/sweep.png' />
            </Col>
          </Row>
        </ModalHeader>
      <ModalBody>
        Here you'll find the items that you weren't completely happy with from your ratings.
        As you donate and sell your things, keep track of them here and sort them as
        you go. Check out our resources if you need help figuring out how to go about
        donating or selling your stuff. Its time to Tydii up!
      </ModalBody>
      <ModalFooter>
        <Col className="quote text-center mt-5" xs="12">
          “It is the preoccupation with possessions that prevents us
          from living freely and nobly.”
        <Col className="blockquote-footer" xs="12">
            Bertrand Russell
        </Col>
        </Col>
      </ModalFooter>
    </Modal>
  )

}

export default function LocalStateResults() {
  const [localStateItems, setLocalStateItems] = usePersistedState('items', {})
  const localStateValues = Object.values(localStateItems)
  const filteredLocalItems = localStateValues.filter(item => item.rating <= 3)
  const { items, updateItem } = useItemState(filteredLocalItems)
  const [visibleAlert, setVisibleAlert] = useState(false);
  const { data } = useSWR('/api/me', async function () {
    const data = await res.json()
    return data;
  })
  const donatedArray = items.filter(item => item.result === 'donated')
  const soldArray = items.filter(item => item.result === 'sold')

  function handleSubmit(e) {
    // set local state to keep data on refresh
    setLocalStateItems(items)
    // save to database
    e.preventDefault()
    fetch('/api/list', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: data.userId,
        list: items
      }),
    })
      .then((r) => r.json())
      .then(setVisibleAlert(true))
  }

  return (
    <Layout>
      <InstructionsModal />
      <Row>
        <Col className='text-center my-1' lg='2'>
          <h5>Your Progress</h5>
        </Col>
        <Col lg='9' className='my-auto'>
          <Progress value={(donatedArray.length + soldArray.length) / items.length * 100} />
        </Col>
        <Col className='pl-0'>
          <h5 className='d-none d-md-block'>100%</h5>
        </Col>
      </Row>
      <Row>
        <Col className='result-box text-center' lg="4" md="6" sm="6">
          <DonateSellResults items={items} updateItem={updateItem} />
        </Col>
        <Col lg="4" md="5" sm="5">
          <DonatedItems donatedArray={donatedArray} />
          <SoldItems soldArray={soldArray} />
        </Col>
        <Col className='m-auto text-center d-none d-lg-block' >
          <h3>How do I donate?</h3>
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
            <ListGroupItem tag="a" href="https://poshmark.com/" action>
              Poshmark: Sell your clothes online
              </ListGroupItem>
            <ListGroupItem tag="a" href="https://www.daveramsey.com/blog/garage-sale-tips" action>
              Setting up a yard sale
              </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
      <Row className='d-flex flex-column'>
        <Col className='text-center'>
          <button className='w-25 mt-3' type='submit' onClick={handleSubmit}>Save</button>
          <Alert className='text-center mx-auto w-25' color="success" isOpen={visibleAlert} toggle={() => setVisibleAlert(false)} fade={true}>Save Successful!</Alert>
        </Col>
      </Row>
    </Layout>
  )
}