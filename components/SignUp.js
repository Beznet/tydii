import React, {useState, useCallback} from 'react';
import {
  Input,
  Label,
  Form,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import cookie from 'js-cookie';
import useToggle from '../hooks/useToggle'
import handleSubmit from '../calls/rest'

function SignupForm () {
  const [signupError, setSignupError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupModalOpen, toggleSignupModal] = useToggle();

  const handleCloseClick = useCallback(() => {
    setEmail()
    setPassword()
    toggleSignupModal()
  }, [])

 function handleSignupSubmit(e) {
    let userEmail = email
    let userPassword = password
    handleSubmit(e, userEmail, userPassword)
      .then((r) => r.json())
      .then((data) => {
        if (data && data.error) {
          setSignupError(data.message);
        }
        if (data && data.token) {
          //set cookie
          cookie.set('token', data.token, {expires: 2});
          setEmail()
          setPassword()
          toggleSignupModal()
        }
      });
  }
  return (
    <>
      <button onClick={toggleSignupModal} color='success' size='lg'>Sign Up</button>
      <Modal
      isOpen={signupModalOpen}
      toggle={handleCloseClick}
      modalTransition={{ timeout: 0 }}
      backdropTransition={{ timeout: 0 }}
      >
      <Form onSubmit={handleSignupSubmit}>
        <ModalHeader tag='h2' close={<i className='close fa fa-close cursor-pointer' onClick={handleCloseClick} />}>
          Sign Up
        </ModalHeader>
        <ModalBody>
        <FormGroup>
          <Label for="email">
            email
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
            />
          </Label>

          <Label for="password">
            password
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
            />
          </Label>
          <ModalFooter>
            <input type="submit" value="Submit" />
          </ModalFooter>
          {signupError && <p style={{color: 'red'}}>{signupError}</p>}
        </FormGroup>
        </ModalBody>
        </Form>
      </Modal>
    </>
  );
};

export default SignupForm;
