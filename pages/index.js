import React, { useState } from 'react';
import '../styles/style.css';
import { Badge, Col, Row, Popover, PopoverBody } from 'reactstrap';
import Layout from '../components/Layout';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import useItemState from '../components/useItemState';
import DecisionTable from '../components/DecisionTable';
//  import useItemState from '../components/useItemStateImmer';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Index() {
  const { items, addItem, deleteItem, updateItem } = useItemState([]);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const popToggle = () => setPopoverOpen(!popoverOpen);

  return (
    <Layout>
      <base target="_blank" />
      <Row>
        <Col className="align-items-center" md="3">
          <Badge color="info" id="Popover1">
            How do I use this?
          </Badge>
          <Popover
            placement="bottom"
            isOpen={popoverOpen}
            target="Popover1"
            toggle={popToggle}
          >
            <PopoverBody>
              Add items you're unsure of getting rid of. Rate them based on how
              happy they make you. Click 'Analyze' when you're done to see what
              you need to part ways with
            </PopoverBody>
          </Popover>
        </Col>
        <Col className="align-items-center" md="6">
          <div className="form-box">
            <ItemForm
              saveItem={itemText => {
                const trimmedText = itemText.trim();

                if (trimmedText.length > 0) {
                  addItem(trimmedText);
                }
              }}
            />
            <ItemList
              items={items}
              deleteItem={deleteItem}
              updateItem={updateItem}
            />
          </div>
          <DecisionTable items={items} />
        </Col>
        <Col md="3"></Col>
      </Row>
    </Layout>
  );
}
