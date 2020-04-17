import React, { useState } from 'react';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from 'reactstrap';
import Link from 'next/link';

function DonateItems({ items }) {
  console.log(items)
  const donateArray = [];
  for (const item of items) {
    if (item.rating <= 3) {
      donateArray.push(item);
    }
  }

  const donateResults = !donateArray.length
    ? 'You enjoy everying, think a bit harder :)'
    : donateArray.map(item => (
        <Col xs="12" className="mb-2 decision-text">
          <h4>{item.name.toUpperCase()}</h4>
        </Col>
      ));

  return (
    <>
      <Row className="text-center">{donateResults}</Row>
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
          modalTransition={{ timeout: 500 }}
          backdropTransition={{ timeout: 500 }}
          toggle={toggle}
          className=""
        >
          <ModalHeader className="justify-content-center">
            <Row>
              <Col xs="12" className="d-inline-flex">
                <img
                  className="flipped-sweep broom"
                  alt="broom sweeping"
                  src="/sweep.png"
                />
                <h2 className="rid-text mx-2 text-center">
                  Get rid of these items
                </h2>
                <img className="broom" alt="broom sweeping" src="/sweep.png" />
              </Col>
            </Row>
          </ModalHeader>
          <ModalBody>
            {items.length === 0 ? (
              "There's nothing here"
            ) : (
              <Col xs="12">
                <Row>
                  <Col xs="12">
                    <DonateItems items={items} />
                  </Col>
                  <Col className="quote text-center mt-5" xs="12">
                    “It is the preoccupation with possessions that prevents us
                    from living freely and nobly.”
                    <Col className="blockquote-footer" xs="12">
                      Bertrand Russell
                    </Col>
                  </Col>
                </Row>
              </Col>
            )}
          </ModalBody>
          <ModalFooter className="justify-content-center">
            <Link href="/resources">
              <button className="decision-button" type="button">
                Sell my stuff
              </button>
            </Link>
            <Link href="/resources">
              <button className="decision-button" type="button">
                Donate my stuff
              </button>
            </Link>
          </ModalFooter>
        </Modal>
      </Col>
    </Row>
  );
};

export default DecisionTable;
