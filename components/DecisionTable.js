import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';

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
      <Col className="text-center mt-3">
        <button
          type="submit"
          onClick={() => {
            setToggle(!toggled);
          }}
        >
          Tydi Up!
        </button>
        <div className={!toggled ? 'd-none' : ''}>
          <DonateItems className="mt-2" items={items} />
        </div>
      </Col>
    </Row>
  );
};

export default DecisionTable;
