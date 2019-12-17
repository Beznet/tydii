import React from 'react';
import '../styles/style.css'
import Layout from '../components/Layout';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList'; 
import useItemState from '../components/useItemState';
import DecisionTable from '../components/DecisionTable';
import { Col, Row, Container, Button } from 'reactstrap';
//  import useItemState from '../components/useItemStateImmer';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Index() {
  const { items, addItem, deleteItem, updateItem, resetAll } = useItemState([])

  return (
    <Layout>
      <Container className='container-fluid pt-3 blue'>
      <Row>
        <Col>
        <h3>How to use?</h3>
            <p>
              This section will have text about how to use the app but I am doing this for example purposes and I should have used Ipsum Lorem or whatever. 
              I will use this for now because I am typing the words I enjoy most lol.
            </p>
        </Col>
        <Col xs='6'>
          <ItemForm
            saveItem={ itemText => {
              const trimmedText = itemText.trim();

              if(trimmedText.length > 0) {
                addItem(trimmedText)
              }
            }}
          />
          <ItemList items={items} deleteItem={ deleteItem } updateItem={updateItem} />
          <Button onClick={resetAll}>Reset</Button>
          <DecisionTable items={items} />
        </Col>
        <Col>
        </Col>
      </Row>
      </Container>
    </Layout>
  );
}
