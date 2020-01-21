import React from 'react';
import '../styles/style.css';
import { Col, Row } from 'reactstrap';
import Layout from '../components/Layout';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import useItemState from '../components/useItemState';
import DecisionTable from '../components/DecisionTable';
//  import useItemState from '../components/useItemStateImmer';

export default function Index() {
  const { items, addItem, deleteItem, updateItem } = useItemState([]);

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
          <DecisionTable items={items} />
        </Col>
        <Col lg="3" md="2"></Col>
      </Row>
    </Layout>
  );
}
