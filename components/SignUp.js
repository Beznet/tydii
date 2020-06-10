import React, { useState, useCallback } from 'react'
import {
  Input,
  Label,
  Form,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner
} from 'reactstrap'
import cookie from 'js-cookie'
import { mutate } from 'swr'
import useToggle from '../hooks/useToggle'
import handleSignupSubmit from '../calls/rest'

function SignupForm() {
  const [signupError, setSignupError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signupModalOpen, toggleSignupModal] = useToggle()
  const [loading, setLoading] = useState(false)

  const handleCloseClick = useCallback(() => {
    setEmail()
    setPassword()
    toggleSignupModal()
  }, [])

  function handleSubmit(e) {
    let userEmail = email
    let userPassword = password

    // start spinner until data is fetched
    setLoading(true)

    // call api
    handleSignupSubmit(e, userEmail, userPassword)
      .then((r) => r.json())
      .then((data) => {
        if (data && data.error) {
          setLoading(false)
          setSignupError(data.message)
        }
        if (data && data.token) {
          //set cookie
          cookie.set('token', data.token, { expires: 2 })
          setEmail()
          setPassword()
          setLoading(false)
          toggleSignupModal()
          mutate('/api/me')
        }
      })
  }
  return (
    <>
      <button onClick={toggleSignupModal} color='success' className='acct-action-btn m-1 badge badge-pill shadow-sm'>Sign Up</button>
      <Modal
        isOpen={signupModalOpen}
        toggle={handleCloseClick}
        modalTransition={{ timeout: 0 }}
        backdropTransition={{ timeout: 0 }}
      >
        <Form onSubmit={handleSubmit}>
          <ModalHeader tag='h2' close={<i className='close fa fa-close cursor-pointer' onClick={handleCloseClick} />}>
            Sign Up
        </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="email">
                <h5>Email</h5>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
              />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label for="password">
                <h5>Password</h5>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
              />
              </Label>
            </FormGroup>
            <ModalFooter className='justify-content-center'>
              <button className='w-25' type="submit" value="Submit">Submit</button>
            </ModalFooter>
            <div className='text-center'>
              {loading ? <Spinner color='secondary' /> : ''}
              {signupError && <p style={{ color: 'red' }}>{signupError}</p>}
            </div>
          </ModalBody>
        </Form>
      </Modal>
    </>
  )
}

export default SignupForm
