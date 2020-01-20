import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

function DonateItems({ items }) {
  const donateArray = [];
  for (const item of items) {
    if (item.rating <= 3) {
      donateArray.push(item);
    }
  }

  const donateResults = !donateArray.length
    ? 'You enjoy everying, think a bit harder :)'
    : donateArray.map(item => <p>{item.name}</p>);

  return (
    <>
      <div>
        <h5 className="result-names">{donateResults}</h5>
      </div>
    </>
  );
}

const DecisionTable = ({ items }) => {
  const [toggled, setToggle] = useState(false);
  const toggle = () => setToggle(!toggled);

  return (
    <Row>
      <Col className="text-center mt-3">
        <button
          id="tydi-button"
          type="submit"
          onClick={() => {
            setToggle(!toggled);
          }}
        >
          Tydi Up!
        </button>
        <Modal
          isOpen={toggled}
          modalTransition={{ timeout: 2000 }}
          toggle={toggle}
          className=""
        >
          <ModalHeader toggle={toggle}>Get rid of these items...</ModalHeader>
          <ModalBody>
            {items.length === 0 ? (
              'You like everything'
            ) : (
              <div>
                <DonateItems items={items} />
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Do Something
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Col>
    </Row>
  );
};

export default DecisionTable;
