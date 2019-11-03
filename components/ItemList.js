import React, { useState } from 'react';
import { CustomInput, Button } from 'reactstrap';
import Slider from './Slider';

const ItemList = ({ items, deleteItem }) => {

const [ value, setValue ] = useState()

  return (
    <ul>
      {items.map((item, index) => (
          <li>
            <p>{item}</p>
            <Button onClick={()=> deleteItem(index)}>
              Delete Item
            </Button>
            <Slider />
          </li>
      ))}
    </ul>
  )
}

export default ItemList;