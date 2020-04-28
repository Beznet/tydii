import React from 'react';
import '../styles/style.css';
import { Col, Row } from 'reactstrap';
import Layout from '../components/Layout';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import useItemState from '../components/useItemState';
import DecisionTable from '../components/DecisionTable';
import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';
import cookie from 'js-cookie';
import LoginForm from '../components/login';
import SignupForm from '../components/SignUp';
import Link from 'next/link';

export default function Index() {
  const { items, addItem, deleteItem, updateItem } = useItemState([]);
  let loggedIn = false

  const {data, revalidate} = useSWR('/api/me', async function(args) {
    const res = await fetch(args);
    return res.json();
  });
  if(!data) {
    console.log('no data')
  }
  else if (data.userId) {
    loggedIn = true
  }

  return (
    <Layout>
      <Row>
        <Col lg="3" md="2"></Col>
        <Col className="align-items-center" lg="6" md="8">
          <div className="form-box">
            <ItemForm
              saveItem={itemText => {
                const trimmedText = itemText.trim();

                if (trimmedText.length > 0) {
                  addItem(trimmedText);
                }
              }}
            />
            <ItemList
              items={items}
              deleteItem={deleteItem}
              updateItem={updateItem}
            />
          </div>
          <DecisionTable items={items} loggedIn={loggedIn} userData={data} />
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
          cookie.remove('token');
          revalidate();
        }}
        >
          Logout
        </button>
        }
        </Col>
      </Row>
        <Link href='/results'>
          <h2>Click Me</h2>
        </Link>
    </Layout>
  );
}
