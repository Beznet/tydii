import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import Slider from './Slider';

/**
 * TODO: Make an Item component
 */
const ItemList = ({ items, deleteItem, updateItem }) => {
  const renderItems = () =>
    !items.length ? (
      <Col className="placeholder-text m-4 text-center">
        <h3>How to use:</h3>
        <h4>
          Add items you're unsure about keeping. Think about each one then rate
          that item on how happy it makes you feel.
        </h4>
      </Col>
    ) : (
      items.map(item => {
        const updateValueHandler = rating =>
          updateItem(Object.assign({}, item, { rating }));

        return (
          <Col className="d-flex-inline" xs="12">
            <Row className="item">
              <Col xs="1">
                <Button
                  id="close-button"
                  className="float-left ml-sm-4"
                  close
                  onClick={() => {
                    deleteItem(item.id);
                    console.log('ass');
                  }}
                />
              </Col>
              <Col className="text-center mb-2 text-break" xs="5">
                <h5>{item.name}</h5>
              </Col>
              <Col
                className="slider-face d-inline-block mb-3 ml-0 px-sm-0"
                xs="6"
              >
                <Slider
                  className=""
                  value={item.rating}
                  onValueChange={updateValueHandler}
                />
              </Col>
            </Row>
          </Col>
        );
      })
    );

  return <Row className="no-gutters">{renderItems()}</Row>;
};

export default ItemList;
