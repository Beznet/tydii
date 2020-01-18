import React from 'react';
import { Button, Col, Row } from 'reactstrap';
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
        <>
          <Col
            className="d-inline text-center mb-2 text-wrap overflow-auto"
            xs="6"
          >
            <Button
              className="float-left ml-3"
              close
              onClick={() => deleteItem(item.id)}
            />
            <h5>{item.name}</h5>
          </Col>
          <Col className="d-inline text-center mb-3 pr-5" xs="6">
            <Slider
              className=""
              value={item.rating}
              onValueChange={updateValueHandler}
            />
          </Col>
        </>
      );
    });

  return <Row>{renderItems()}</Row>;
};

export default ItemList;
