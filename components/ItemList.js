import React from 'react';
import Star from '../components/Rating';

const ItemList = ({ items, deleteItem }) => {

  return (
    <ul>
      {items.map((item, index) => (
          <li>
            <h2>{item}</h2>
            <button onClick={()=> deleteItem(index)}>
              Delete Item
            </button>
            <Star />
          </li>
      ))}
    </ul>
  )
}

export default ItemList;