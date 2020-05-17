import Layout from '../components/Layout'
import React from 'react'
import usePersistedState from '../hooks/usePersistedState'
import {Col, Row} from 'reactstrap'
import useSWR from 'swr'
import cookie from 'js-cookie'
import Link from 'next/link'

export default function LocalStateResults () {
  const [localStateItems, _] = usePersistedState('items', {})
  const localStateValues = Object.values(localStateItems)
  const donate = localStateValues.filter( item => item.rating <= 3)
  const keep = localStateValues.filter( item => item.rating > 3)

  const {data, revalidate} = useSWR('/api/me', async function(args) {
    const res = await fetch(args)
    const data = res.json()
    
    return data;
  })
  let loggedIn = false

  if (!data) {
    console.log('no data')
  } else if (data.userId) {
    loggedIn = true;
  }

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
        <Col></Col>
        <Col>
        <div>
          <h2>Keep</h2>
          {
            keep.map( item => <li>{item.name}</li>)
          }
        </div>
        <div>
          <h2>Donate</h2>
          {
            donate.map( item => <li>{item.name}</li>)
          }
        </div>
        <button type='submit' onClick={handleSubmit}>Save</button>
        </Col>
        <Col lg="3" md="2">
          {loggedIn &&
          <Link href='/'>
            <a>
              <button
                onClick={() => {
                  cookie.remove('token')
                  revalidate()
                }}
              >
                Logout
              </button>
            </a>
          </Link>
          }
          </Col>
        </Row>
    </Layout>
  )
}