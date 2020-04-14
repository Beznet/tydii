import React, {useState, useCallback} from 'react';
import {
  Button,
  Input,
  Form,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import Router from 'next/router';
import cookie from 'js-cookie';
import useToggle from '../hooks/useToggle'

function LoginForm () {
  const [loginError, setLoginError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginModalOpen, toggleLoginModal] = useToggle()

  const handleCloseClick = useCallback(() => {
    toggleLoginModal()
  }, [])

  function handleSubmit(e) {
    e.preventDefault();
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
        return r.json();
      })
      .then((data) => {
        if (data && data.error) {
          setLoginError(data.message);
        }
        if (data && data.token) {
          //set cookie
          cookie.set('token', data.token, {expires: 2});
          Router.push('/');
        }
      });
    toggleLoginModal()
  }
  
  return (
    <>
    <Button className='m-2' onClick={toggleLoginModal} color='success' size='lg'>Login</Button>
      <Modal
      isOpen={loginModalOpen}
      toggle={handleCloseClick}
      modalTransition={{ timeout: 0 }}
      backdropTransition={{ timeout: 0 }}
      >
        <Form onSubmit={handleSubmit}>
          <ModalHeader tag='h2' close={<i className='close fa fa-close cursor-pointer' onClick={handleCloseClick} />}>
            Login
          </ModalHeader>
          <ModalBody>
          <FormGroup>
            <Input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ModalFooter>
              <Input type="submit" value="Submit" />
            </ModalFooter>
            {loginError && <p style={{color: 'red'}}>{loginError}</p>}
          </FormGroup>
          </ModalBody>
        </Form>
      </Modal>
    </>
  );
};

export default LoginForm;
