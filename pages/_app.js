import React from 'react';
import App from 'next/app';
import useItemState from '../components/useItemState';
import ItemContext from '../components/ItemContext';

function MyApp({Component, pageProps}){
    const { items, addItem, deleteItem, updateItem  } = useItemState([]);

    return (
    <ItemContext.Provider value={{items, addItem, deleteItem, updateItem}}>
      <Component {...pageProps} />
    </ItemContext.Provider>
    )
}
  
  export default MyApp;