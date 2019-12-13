import React from 'react';
import Layout from '../components/Layout';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList'; 
import useItemState from '../components/useItemState';
import DecisionTable from '../components/DecisionTable';
import { Button } from 'reactstrap';
//  import useItemState from '../components/useItemStateImmer';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Index() {
  const { items, addItem, deleteItem, updateItem, resetAll } = useItemState([])

  return (
    <Layout>
      <h1>Min App</h1>
      
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
    </Layout>
  );
}
