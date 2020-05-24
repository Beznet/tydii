import React, {useState} from 'react'
import '../styles/style.css'
import {
  Col, 
  Row,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap'
import Layout from '../components/Layout'
import ItemInput from '../components/ItemInput'
import ItemList from '../components/ItemList'
import useItemState from '../hooks/useItemState'
import fetch from 'isomorphic-unfetch'
import useSWR from 'swr'
import cookie from 'js-cookie'
import LoginForm from '../components/Login'
import SignupForm from '../components/SignUp'
import Link from 'next/link'
import usePersistedState from '../hooks/usePersistedState'
import useToggle from '../hooks/useToggle'

const TydiiButton = ({items, loggedIn}) => {
  const localItems = {...items}
  const [_, setLocalItems] = usePersistedState('items', 'nothing')
  const [buttonModal, toggleButtonModal] = useToggle(false)

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
        <Modal centered toggle={() => toggleButtonModal(!buttonModal)} isOpen={buttonModal}>
          <ModalBody>
            Sign up or login to see your results
          </ModalBody>
        </Modal>
      </>
      :
      <>
        <Link href='/results'>
          <a>
            <button 
              id="tydi-button" 
              type="submit" 
              onClick={() => setLocalItems(localItems)}>
                Tydii Up!
            </button>
          </a>
        </Link>
      </>
    }
    </>
  )
}

const LoggedInChoice = ({databaseItems}) => {
  const [_, setLocalItems] = usePersistedState('items', 'nothing')
  const [choiceModalOpen, toggleChoiceModal] = useToggle(true)

  return (
    <Modal
      isOpen={choiceModalOpen}
      modalTransition={{ timeout: 0 }}
      backdropTransition={{ timeout: 0 }}
      >
      <ModalHeader>You have an existing list</ModalHeader>
      <ModalBody>
        <Link href='/results'>
          <a>
            <button onClick={() => setLocalItems(databaseItems)}>Go to my list</button>
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

  return (
    <Layout>
      <Row>
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
                  <TydiiButton loggedIn={loggedIn} items={items}/>
                </Col>
              </Row> 
            : ''}
        </Col>
        <Col lg="3" md="2">
        {!loggedIn
        ?
        <div className='d-flex flex-column w-50'>
          <SignupForm />
          <LoginForm setDatabaseItems={setDatabaseItems} />
        </div>
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
