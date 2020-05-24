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

const DonateSellDropdown = ({updateItem, item}) => {
  const handleClick = (e) => {
    const result = e.target.value
    updateItem(Object.assign({}, item, { result }))
  }

  const dropDownTitle = item.result

  return (
    <UncontrolledDropdown>
    <DropdownToggle caret>
      {dropDownTitle}
    </DropdownToggle>
    <DropdownMenu>
      <DropdownItem value='sold' onClick={handleClick}>Sold</DropdownItem>
      <DropdownItem value='donated' onClick={handleClick}>Donated</DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
  )
}

export default function LocalStateResults () {
  const [localStateItems, _] = usePersistedState('items', {})
  const localStateValues = Object.values(localStateItems)
  const filteredLocalItems = localStateValues.filter( item => item.rating <= 3)
  const { items, deleteItem, updateItem } = useItemState(filteredLocalItems)
  const {data} = useSWR('/api/me', async function(args) {
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

  console.log(items)

  return (
    <Layout>
      <Row>
        <Col lg="4" md="2">
          <h2>Donate or Sell</h2>
          {
            items.map( item => 
              <li>
                {item.name}
                <DonateSellDropdown updateItem={updateItem} item={item} />
              </li>)
          }
        <button type='submit' onClick={handleSubmit}>Save</button>
        </Col>
        <Col lg="4" md="2">
          <h2>Donate Bucket</h2>
        </Col>
        <Col lg="4" md="2">
          <h2>Sell Bucket</h2>
          </Col>
        </Row>
    </Layout>
  )
}