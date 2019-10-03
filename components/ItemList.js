import React from 'react';

const ItemList = ({ items, deleteItem }) => {

  return (
    <ul>
      {items.map((item, index) => (
          <li>
            <h2>{item}</h2>
            <button onClick={()=> deleteItem(index)}>
              Delete Item
            </button>
          </li>
      ))}
    </ul>
  )
}

export default ItemList;