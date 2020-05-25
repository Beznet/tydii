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

const DonateSellResults = ({ items, updateItem, handleSubmit }) => (
  <Col lg="4" md="2">
    <h2>Donate or Sell</h2>
    {
      items.map(item => (
        <Row className="d-flex-inline mb-2">
          <Col className="d-flex-inline" xs='6'>
            <h5>
              {item.result !== 'owned' ? <s>{item.name}</s> : item.name}
            </h5>
          </Col>
          <Col className="d-flex-inline" xs='6'>
            <DonateSellDropdown updateItem={updateItem} item={item} />
          </Col>
        </Row>
      ))
    }
    <button type='submit' onClick={handleSubmit}>Save</button>
  </Col>
)

const DonatedItems = ({ items }) => (
  <Col lg="4" md="2">
    <h2>Donated Items</h2>
    {
      items.map(item => item.result === 'donated' && <h5 className='item'>{item.name}</h5>)
    }
  </Col>
)

const SoldItems = ({ items }) => (
  <Col lg="4" md="2">
    <h2>Sold Items</h2>
    {
      items.map(item => item.result === 'sold' && <h5 className='item'>{item.name}</h5>)
    }
  </Col>
)

export default function LocalStateResults() {
  const [localStateItems, _] = usePersistedState('items', {})
  const localStateValues = Object.values(localStateItems)
  const filteredLocalItems = localStateValues.filter(item => item.rating <= 3)
  const { items, deleteItem, updateItem } = useItemState(filteredLocalItems)
  const { data } = useSWR('/api/me', async function (args) {
    const res = await fetch(args)
    const data = res.json()

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

  console.log(data)

  return (
    <Layout>
      <Row>
        <DonateSellResults items={items} updateItem={updateItem} handleSubmit={handleSubmit} />
        <DonatedItems items={items} />
        <SoldItems items={items} />
      </Row>
    </Layout>
  )
}