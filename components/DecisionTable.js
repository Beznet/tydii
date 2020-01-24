import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from 'reactstrap';
import Link from 'next/link';

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
        {!toggled ? (
          <button
            id="tydi-button"
            type="submit"
            onClick={() => {
              setToggle(!toggled);
            }}
          >
            Tydi Up!
          </button>
        ) : (
          <Spinner color="hsl(249, 13%, 30.2%)" />
        )}
        <Modal
          isOpen={toggled}
          centered
          // modalTransition={{ timeout: 1500 }}
          // backdropTransition={{ timeout: 1500 }}
          toggle={toggle}
          className=""
        >
          <ModalHeader toggle={toggle}>Get rid of these items...</ModalHeader>
          <ModalBody>
            {items.length === 0 ? (
              "There's nothing here"
            ) : (
              <div>
                <DonateItems items={items} />
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Link>
              <a href="/resources">
                <button type="button">Sell my stuff!</button>
              </a>
            </Link>
            <Link>
              <a href="/resources">
                <button type="button">Donate my stuff!</button>
              </a>
            </Link>
            <button id="cancel-button" type="button" onClick={toggle}>
              Cancel
            </button>
          </ModalFooter>
        </Modal>
      </Col>
    </Row>
  );
};

export default DecisionTable;
