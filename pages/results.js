import Layout from '../components/Layout'
import React from 'react'
import usePersistedState from '../hooks/usePersistedState'
import {Col, Row} from 'reactstrap'

export default function LocalStateResults () {
  const [localStateItems, _] = usePersistedState('items', {})
  const localStateValues = Object.values(localStateItems)
  const donate = localStateValues.filter( item => item.rating <= 3)

  function handleSubmit(e) {
    e.preventDefault()
    fetch('/api/list', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: data.userId,
        list: localStateItems
      }),
    })
      .then((r) => r.json())
  }

  return (
    <Layout>
      <Row>
        <Col lg="4" md="2">
        <div>
          <h2>Donate or Sell</h2>
          {
            donate.map( item => <li>{item.name}</li>)
          }
        </div>
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