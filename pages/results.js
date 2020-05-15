import Layout from '../components/Layout'
import React from 'react'
import usePersistedState from '../hooks/usePersistedState'
import {Col, Row} from 'reactstrap'
import useSWR from 'swr'
import cookie from 'js-cookie'
import LoginForm from '../components/Login'
import SignupForm from '../components/SignUp'

export default function LocalStateResults () {
  const [localStateItems, _] = usePersistedState('items', {})
  const localStateValues = Object.values(localStateItems)
  const donate = localStateValues.filter( item => item.rating <= 3)
  const keep = localStateValues.filter( item => item.rating > 3)
  let loggedIn = false

  const {data, revalidate} = useSWR('/api/me', async function(args) {
    const res = await fetch(args)
    return res.json()
  })
  if(!data) {
    loggedIn = false
    console.log('no data')
  }
  else if (data.userId) {
    loggedIn = true
    console.log('logged in')
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetch('/api/list', {
      method: 'POST',
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
        {!loggedIn &&
          <div class="alert alert-warning" role="alert">
            Sign up or Login to save list
          </div>
        }
        </Col>
        <Col lg="3" md="2">
          {!loggedIn
          ?
          <div>
            <LoginForm />
            <SignupForm />
          </div>
          :
          <button
          onClick={() => {
            cookie.remove('token')
            revalidate()
          }}
          >
            Logout
          </button>
          }
          </Col>
        </Row>
    </Layout>
  )
}