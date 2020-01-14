import React from 'react';
import {
  Button,
  ListGroup,
  ListGroupItem,
  ListGroupItemText,
} from 'reactstrap';
import Slider from './Slider';

/**
 * TODO: Make an Item component
 */
const ItemList = ({ items, deleteItem, updateItem }) => {
  const renderItems = () =>
    items.map(item => {
      const updateValueHandler = rating =>
        updateItem(Object.assign({}, item, { rating }));

      return (
        <ListGroupItem>
          <ListGroupItemText className="d-inline mr-5">
            {item.name}
          </ListGroupItemText>
          <Button close onClick={() => deleteItem(item.id)} />
          <Slider value={item.rating} onValueChange={updateValueHandler} />
        </ListGroupItem>
      );
    });

  return (
    <ListGroup className="justify-content-center">{renderItems()}</ListGroup>
  );
};

export default ItemList;
