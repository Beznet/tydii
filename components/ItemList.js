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
          <Col xs="1">
            <Button
              id="close-button"
              className="float-left ml-sm-4"
              close
              onClick={() => deleteItem(item.id)}
            />
          </Col>
          <Col className="d-inline mb-2 text-wrap" xs="3">
            <h5>{item.name}</h5>
          </Col>
          <Col
            className="slider-face no-gutters d-inline text-center mb-3"
            xs="8"
          >
            <Slider
              className=""
              value={item.rating}
              onValueChange={updateValueHandler}
            />
          </Col>
        </>
      );
    });

  return <Row className="no-gutters">{renderItems()}</Row>;
};

export default ItemList;
