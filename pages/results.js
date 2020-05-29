import Layout from '../components/Layout'
import React, { useState } from 'react'
import usePersistedState from '../hooks/usePersistedState'
import {
  Col,
  Row,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
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
    <h2>Donate or Sell</h2>
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

const DonatedItems = ({ items }) => {
  const donatedArray = items.filter( item => item.result === 'donated')
  return (
  <Row className='result-box mb-4'>
    <Col className='text-center'>
      <h2>Donated</h2>
      {
        donatedArray.length === 0 ?
        <div className='placeholder-text mt-5'>
          <h4>Nothing donated yet</h4>
        </div> :
        donatedArray.map(item => <h5 className='item'>{item.name}</h5>)
      }
    </Col>
  </Row>
)}

const SoldItems = ({ items }) => {
  const soldArray = items.filter( item => item.result === 'sold')
  return (
  <Row className='result-box'>
    <Col className='text-center'>
      <h2>Sold</h2>
      {
        soldArray.length === 0 ?
        <div className='placeholder-text mt-5'>
          <h4>Nothing sold yet</h4>
        </div> :
        soldArray.map(item => <h5 className='item'>{item.name}</h5>)
      }
    </Col>
  </Row>
)}

const InstructionsModal = () => {
  const [instructionModal, toggleInstructionModal] = useToggle(true)

  return (
    <Modal centered toggle={toggleInstructionModal} isOpen={instructionModal}>
      <ModalHeader className='justify-content-center'>
        <h2>Time to clean up</h2>
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
        <Col className='result-box text-center mr-3' lg="4" md="2">
          <DonateSellResults items={items} updateItem={updateItem} />
        </Col>
        <Col lg="4" md="2">
          <DonatedItems items={items} />
          <SoldItems items={items} />
        </Col>
        <Col className='resource-box ml-3 my-auto text-center' >
          <h3>Resources</h3>
        </Col>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center'>
          <button className='w-25 mt-3' type='submit' onClick={handleSubmit}>Save</button>
          <Alert className='w-25' color="success" isOpen={visibleAlert} toggle={() => setVisibleAlert(false)} fade={true}>Save Successful!</Alert>
        </Col>
      </Row>
    </Layout>
  )
}