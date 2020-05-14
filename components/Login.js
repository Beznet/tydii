import React, {useState, useCallback} from 'react'
import {
  Input,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import cookie from 'js-cookie'
import Link from 'next/link'
import useToggle from '../hooks/useToggle'
import usePersistedState from '../hooks/usePersistedState'

const LoggedInChoice = ({databaseItems, toggleLoginModal}) => {
  const [_, setLocalItems] = usePersistedState('items', 'nothing')

  return (
    <>
      <ModalHeader>You have an existing list</ModalHeader>
      <ModalBody>
        <Link href='/results'>
          <a>
            <button onClick={() => setLocalItems(databaseItems)}>Go to my list</button>
          </a>
        </Link>
        <button onClick={toggleLoginModal}>Create a new list</button>
      </ModalBody>
    </>
  )
}

function LoginForm () {
  const [loginError, setLoginError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginModalOpen, toggleLoginModal] = useToggle()
  const [loggedIn, setLoggedIn] = useState(false)
  const [databaseItems, setDatabaseItems] = useState()

  const handleCloseClick = useCallback(() => {
    setEmail()
    setPassword()
    toggleLoginModal()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    //call api
    fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((r) => {
        return r.json()
      })
      .then((data) => {
        if (data && data.error) {
          setLoginError(data.message)
        }
        // checks if user has logged in and has an object of items
        if (data && data.token && Object.keys(data.listData).length !== 0) {
          setDatabaseItems(data.listData)
          setLoggedIn(true)
          cookie.set('token', data.token, {expires: 2})
          // resets field data & closes modal
          setEmail()
          setPassword()
        // if user only has an empty object of items, close modal
        } else if (data && data.token) {
          setLoggedIn(true)
          cookie.set('token', data.token, {expires: 2})
          // resets field data & closes modal
          setEmail()
          setPassword()
          toggleLoginModal()
        }
      })
  }
  
  return (
    <>
    <button onClick={toggleLoginModal} color='success' className='m-1 badge badge-pill shadow-sm'>Login</button> 
      <Modal
      isOpen={loginModalOpen}
      toggle={handleCloseClick}
      modalTransition={{ timeout: 0 }}
      backdropTransition={{ timeout: 0 }}
      >
        {loggedIn ? 
        <LoggedInChoice databaseItems={databaseItems} toggleLoginModal={toggleLoginModal} /> : 
        <Form onSubmit={handleSubmit}>
          <ModalHeader tag='h2' close={<i className='close fa fa-close cursor-pointer' onClick={handleCloseClick} />}>
            Login
          </ModalHeader>
          <ModalBody>
          <FormGroup>
            <Label for='email'>
              Email
              <Input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Label>
          </FormGroup>
          <FormGroup>
            <Label for='password'>
              Password
            <Input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            </Label>
          </FormGroup>
            <ModalFooter>
              <Input type="submit" value="Submit" />
            </ModalFooter>
            {loginError && <p style={{color: 'red'}}>{loginError}</p>}
          </ModalBody>
        </Form>
        }
      </Modal>
    </>
  )
}

export default LoginForm
