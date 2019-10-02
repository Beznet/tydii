import React, { useState } from 'react';
import Layout from '../components/Layout';
import ItemForm from '../components/ItemForm';

export default function Index() {
  const [item, setItems] = ([useState])
  return (
    <Layout>
      <h1>Min App</h1>
      <ItemForm 
        saveItem={console.warn}
      />
    </Layout>
  );
}