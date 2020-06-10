import React, { useState } from 'react'
import '../styles/style.css'
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Alert,
  Media
} from 'reactstrap'
import Layout from '../components/Layout'
import ItemInput from '../components/ItemInput'
import ItemList from '../components/ItemList'
import useItemState from '../hooks/useItemState'
import fetch from 'isomorphic-unfetch'
import useSWR from 'swr'
import LoginForm from '../components/Login'
import SignupForm from '../components/SignUp'
import Link from 'next/link'
import usePersistedState from '../hooks/usePersistedState'
import useToggle from '../hooks/useToggle'
import Router from 'next/router'

const TydiiButton = ({ items, loggedIn, toggleHighRatedAlert }) => {
  const localItems = { ...items }
  const [_, setLocalItems] = usePersistedState('items', 'nothing')
  const [buttonModal, toggleButtonModal] = useToggle(false)

  const handleSubmit = () => {
    // throws an alert if they rated every item above 3 to prevent nothing from showing on the results
    if (items.every(item => item.rating > 3)) {
      toggleHighRatedAlert()
    } else {
      setLocalItems(localItems)
      Router.push('/results')
    }
  }

  // my dumb way of rendering a button with a link or a modal depending on if you're logged in or not
  return (
    <>
      {!loggedIn ?
        <>
          <button
            id="tydi-button"
            type="submit"
            onClick={toggleButtonModal}>
            Tydii Up!
        </button>
          <Modal centered toggle={toggleButtonModal} isOpen={buttonModal}>
            <ModalBody>
              Sign Up or Login to see your results <h3 className='d-inline'>☺</h3>
          </ModalBody>
          </Modal>
        </>
        :
        <>
          <button
            id="tydi-button"
            type="submit"
            onClick={handleSubmit}>
            Tydii Up!
            </button>
        </>
      }
    </>
  )
}

const LoggedInChoice = ({ databaseItems }) => {
  const [_, setLocalItems] = usePersistedState('items', 'nothing')
  const [choiceModalOpen, toggleChoiceModal] = useToggle(true)

  return (
    <Modal
      isOpen={choiceModalOpen}
      modalTransition={{ timeout: 0 }}
      backdropTransition={{ timeout: 0 }}
    >
      <ModalHeader className='justify-content-center' tag='h2'>
        Welcome Back!
        <Media className='misc-icons ml-2'src='/smile-face.png' />
      </ModalHeader>
      <ModalBody className='d-flex justify-content-around mb-3'>
        <Link href='/results'>
          <a>
            <button onClick={() => setLocalItems(databaseItems)}>Go to saved list</button>
          </a>
        </Link>
        <button onClick={toggleChoiceModal}>Create a new list</button>
      </ModalBody>
    </Modal>
  )
}

export default function Index() {
  const { items, addItem, deleteItem, updateItem } = useItemState([])
  const [databaseItems, setDatabaseItems] = useState()
  const [highRatedAlert, toggleHighRatedAlert] = useToggle()
  const { data } = useSWR('/api/me', async function (args) {
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

  return (
    <Layout>
      <Row className='main-index-row'>
        <Col lg="3" md="2"></Col>
        <Col className="align-items-center" lg="6" md="8">
          <div className="form-box">
            <ItemInput
              saveItem={itemText => {
                const trimmedText = itemText.trim()

                if (trimmedText.length > 0) {
                  addItem(trimmedText)
                }
              }}
            />
            <ItemList
              items={items}
              deleteItem={deleteItem}
              updateItem={updateItem}
            />
          </div>
          {typeof window !== 'undefined'
            ? <Row>
              <Col className="text-center mt-3">
                <TydiiButton loggedIn={loggedIn} items={items} toggleHighRatedAlert={toggleHighRatedAlert} />
                <Alert color='warning' isOpen={highRatedAlert} toggle={toggleHighRatedAlert} >You rated everything too well! Think a bit harder...</Alert>
              </Col>
            </Row>
            : ''}
        </Col>
        <Col className='d-md-block d-inline-flex justify-content-end'lg="3" md="2">
          {!loggedIn
            ?
            <>
              <div>
                <SignupForm />
              </div>
              <div>
                <LoginForm setDatabaseItems={setDatabaseItems} />
              </div>
            </>
            :
            <>
              {databaseItems && <LoggedInChoice databaseItems={databaseItems} />}
            </>
          }
        </Col>
      </Row>
    </Layout>
  )
}
