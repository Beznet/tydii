import React from 'react';
import Layout from '../components/Layout';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList'; 
import useItemState from '../components/useItemState';

export default function Index() {
  const { items, addItem, deleteItem} = useItemState([])

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
      <ItemList items={items} deleteItem={ deleteItem } />
    </Layout>
  );
}