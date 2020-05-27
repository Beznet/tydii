import Layout from '../components/Layout'
import React from 'react'
import usePersistedState from '../hooks/usePersistedState'
import {
  Col,
  Row,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import useSWR from 'swr'
import useItemState from '../hooks/useItemState'

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

export default function LocalStateResults() {
  const [localStateItems, _] = usePersistedState('items', {})
  const localStateValues = Object.values(localStateItems)
  const filteredLocalItems = localStateValues.filter(item => item.rating <= 3)
  const { items, updateItem } = useItemState(filteredLocalItems)
  const { data } = useSWR('/api/me', async function () {
    const data = await res.json()
    return data;
  })

  function handleSubmit(e) {
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
  }

  return (
    <Layout>
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
      <button className='w-25 mt-3' type='submit' onClick={handleSubmit}>Save</button>
    </Layout>
  )
}