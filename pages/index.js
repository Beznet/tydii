import React, { useState } from 'react';
import Layout from '../components/Layout';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList'; 

export default function Index() {
  const [items, setItems] = useState([])

  return (
    <Layout>
      <h1>Min App</h1>
      
      <ItemForm
        saveItem={ itemText => {
          const trimmedText = itemText.trim();

          setItems([...items, trimmedText])
        }}
      />

      <ItemList items={items} deleteItem={(itemIndex) => {
        const newItems = items.filter((_, index) => index !== itemIndex);

        setItems(newItems)
      }}/>
    </Layout>
  );
}