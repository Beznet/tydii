import React from 'react';

const ItemList = ({ items, deleteItem }) => (
  <ul>
    {items.map((item, index) => (
      <>
        <li>
          {item}
        </li>
        <button onClick={()=> deleteItem(index)}>
          Delete Item
        </button>
      </>
    ))}
  </ul>
)

export default ItemList