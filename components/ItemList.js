import React, { useState } from 'react';
import { CustomInput, Button } from 'reactstrap';

const ItemList = ({ items, deleteItem }) => {

const [ value, setValue ] = useState()

console.log(value)

  return (
    <ul>
      {items.map((item, index) => (
          <li>
            <p>{item}</p>
            <Button onClick={()=> deleteItem(index)}>
              Delete Item
            </Button>
            <input
              type="range" 
              className="slider" 
              name="customRange"

              value={value}
              onChange={(e) => setValue(e.target.value)} 
              min="1" 
              max="5" 
            />
          </li>
      ))}
    </ul>
  )
}

export default ItemList;