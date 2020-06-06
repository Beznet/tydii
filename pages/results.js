import Layout from '../components/Layout'
import React, { useState, useEffect } from 'react'
import usePersistedState from '../hooks/usePersistedState'
import {
  Col,
  Row,
  UncontrolledDropdown,
  UncontrolledCollapse,
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
import Resources from '../components/Resources'

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
          <Col className="d-flex-inline" xs='7'>
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
    <Row className='mb-2'>
      <Col className='ds-result-box text-center'>
        <Media className='mt-2 misc-icons' object src='/donation.png' />
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
    <Row>
      <Col className='ds-result-box mt-2 text-center'>
        <Media className='mt-2 misc-icons' object src='/money.png' />
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

const ProgressBar = ({donatedArray, soldArray, items, toggleFinishModal}) => {

  useEffect(() => {
    if(donatedArray.length + soldArray.length === items.length) {
      toggleFinishModal()
    }
  }, [items])

  const progressBarFill = (donatedArray.length + soldArray.length) / items.length * 100

  console.log('fill level', progressBarFill)
  return (
    <Row className='mb-2'>
      <Col className='text-center my-1' lg='2'>
        <h5>Your Progress</h5>
      </Col>
      <Col lg='9' className='my-auto'>
        <Progress value={progressBarFill} />
      </Col>
      <Col className='d-none d-lg-block mt-2 pl-0'>
        <h5 className='d-none d-lg-block'>100%</h5>
      </Col>
    </Row>
  )
}

const InstructionsModal = () => {
  const [instructionModal, toggleInstructionModal] = useToggle(true)

  return (
    <Modal centered toggle={toggleInstructionModal} isOpen={instructionModal}>
        <ModalHeader className='justify-content-center'>
          <Row>
            <Col className='d-flex'>
              <h2 className='rid-text'>Time to Tydii Up!</h2>
              <Media className='misc-icons ml-2' object src='/sweep.png' />
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

const FinishModal = ({finishModal, toggleFinishModal}) => {

  return (
    <Modal centered toggle={toggleFinishModal} isOpen={finishModal}>
        <ModalHeader className='justify-content-center'>
          <Row>
            <Col className='d-flex'>
              <h2 className='rid-text'>You did it!</h2>
              <Media className='misc-icons ml-2' object src='/love-face.png' />
            </Col>
          </Row>
        </ModalHeader>
      <ModalBody>
        You made a lot of big decisions during this whole process so you
        deserve to give yourself a big pat on the back. Please consider sharing
        the good news with your friends on social media!
        <div className='mt-3'>
          <a href="https://twitter.com/share?text=Just finished getting rid of my stuff with Tydii!&url=https://tydiiup.com"
          className="twitter-share-button mr-2" 
          data-hashtags="tydiiup" 
          data-show-count="false">
            <Media className='social-icons' object src='/twitter.png' />
          </a>
          <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftydiiup.com%2F&amp;src=sdkpreparse">
            <Media className='social-icons' object src='/facebook.png' />
          </a>
        </div>
      </ModalBody>
      <ModalFooter className='justify-content-start'>
        Help out the Tydii creator:
        <a target="_blank" href="https://www.paypal.me/bennettdungan1">
        <button color='success' className='acct-action-btn badge badge-pill shadow-sm'>Donate</button>
        </a>
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
  const [finishModal, toggleFinishModal] = useToggle(false)

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
      <FinishModal finishModal={finishModal} toggleFinishModal={toggleFinishModal} />
      <Row>
        <Col>
          <ProgressBar donatedArray={donatedArray} soldArray={soldArray} items={items} toggleFinishModal={toggleFinishModal} />
        </Col>
      </Row>
      <Row>
        <Col className='result-box text-center' lg="4" md="6" sm="6">
          <DonateSellResults items={items} updateItem={updateItem} />
        </Col>
        <Col lg="4" md="5" sm="5">
          <DonatedItems donatedArray={donatedArray} />
          <SoldItems soldArray={soldArray} />
          <button className='d-sm-block d-md-none w-100' color="primary" id="toggler" >
            <h4 className='d-inline'>Resources</h4> ▼ 
          </button>
          <UncontrolledCollapse toggler="#toggler">
            <Resources />
          </UncontrolledCollapse>
        </Col>
        <Col className='m-auto text-center d-none d-lg-block' >
          <Resources />
        </Col>
      </Row>
      <Row>
        <Col className='text-center'>
          <button className='acct-action-btn w-25 mt-3' type='submit' onClick={handleSubmit}>Save</button>
          <Alert className='text-center mx-auto w-50' color="success" isOpen={visibleAlert} toggle={() => setVisibleAlert(false)} fade={true}>Save Successful!</Alert>
        </Col>
      </Row>
    </Layout>
  )
}