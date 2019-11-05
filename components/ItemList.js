import React, { useState } from 'react';
import { CustomInput, Button } from 'reactstrap';
import Slider from './Slider';

/**
 * TODO: Make an Item component
 */
const ItemList = ({ items, deleteItem, updateItem }) => {

  const renderItems = () => items.map(item => {
    const deleteHandler = () => deleteItem(item.id)
    const updateValueHandler = (rating) => updateItem(Object.assign({}, item, {rating}))

    return (
      <li>
        <p>{item.name}</p>
        <Button onClick={()=> deleteItem(item.id)}>
          Delete Item
        </Button>
        <Slider value={item.rating} onValueChange={updateValueHandler}/>
      </li>
    )
  })

  return (
    <ul>
      {renderItems()}
    </ul>
  )
}

export default ItemList;
