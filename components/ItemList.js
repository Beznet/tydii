import React, { useState } from 'react';
import {
  Button,
  ListGroup,
  ListGroupItem,
  ListGroupItemText,
  Row,
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
        <Row>
          <ListGroupItem className="w-75">
            <ListGroupItemText className="d-inline mr-5">
              {item.name}
            </ListGroupItemText>
            <Button close onClick={() => deleteItem(item.id)} />
            <Slider value={item.rating} onValueChange={updateValueHandler} />
          </ListGroupItem>
        </Row>
      );
    });

  return (
    <ListGroup className="justify-content-center">{renderItems()}</ListGroup>
  );
};

export default ItemList;
