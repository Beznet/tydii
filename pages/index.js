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
import ItemForm from '../components/ItemForm'
import ItemList from '../components/ItemList'
import useItemState from '../components/useItemState'
import fetch from 'isomorphic-unfetch'
import useSWR from 'swr'
import cookie from 'js-cookie'
import LoginForm from '../components/Login'
import SignupForm from '../components/SignUp'
import Link from 'next/link'
import usePersistedState from '../hooks/usePersistedState'
import useToggle from '../hooks/useToggle'

const LocalStateButton = ({items}) => {
  const localItems = {...items}
  const [_, setLocalItems] = usePersistedState('items', 'nothing')

  return (
    <button id="tydi-button" type="submit" onClick={() => setLocalItems(localItems)}>Tydii Up!</button>
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
  //const [loggedIn, setLoggedIn] = useState(!!data && !!data.userId)
  const [listData, _] = useState([])
  let loggedIn = false

  if (!data) {
    console.log('no data')
  } else if (data.userId) {
    loggedIn = true;
  }

  console.log(databaseItems)

  return (
    <Layout>
      <Row>
        <Col lg="3" md="2"></Col>
        <Col className="align-items-center" lg="6" md="8">
          <div className="form-box">
            <ItemForm
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
                  <Link href='/results'>
                    <a><LocalStateButton items={items} databaseList={listData}/></a>
                  </Link>
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
          <button
          className='m-1 badge badge-pill shadow-sm'
          onClick={() => {
            cookie.remove('token')
            revalidate()
          }}
          >
            Logout
          </button>
        </>
        }
        </Col>
      </Row>
    </Layout>
  )
}
