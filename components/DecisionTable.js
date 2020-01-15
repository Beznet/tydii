import React, { useState } from 'react';
import { Button, Row, Col } from 'reactstrap';

function DonateItems({ items }) {
  const donateArray = [];

  for (const item of items) {
    if (item.rating <= 3) {
      donateArray.push(item);
    }
  }

  const donateResults = donateArray.map(item => <p>{item.name}</p>);

  const decisionText = () => {
    if (!donateArray.length) {
      return 'You enjoy all the things! Maybe think a bit harder...';
    }
    return 'Donate or sell these items:';
  };

  return (
    <>
      <div>
        <h3>{decisionText()}</h3>
        <h5 className="result-names">{donateResults}</h5>
      </div>
    </>
  );
}

const DecisionTable = ({ items }) => {
  const [toggled, setToggle] = useState(false);

  return (
    <Row>
      <Col className="text-center">
        <Button
          color="success"
          onClick={() => {
            setToggle(!toggled);
          }}
        >
          {' '}
          Tydi Up!{' '}
        </Button>
        <div className={!toggled ? 'd-none' : ''}>
          <DonateItems className="mt-2" items={items} />
        </div>
      </Col>
    </Row>
  );
};

export default DecisionTable;
