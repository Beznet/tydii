import React, { useState } from 'react';
import { Button } from 'reactstrap';

function DonateItems({ items }) {
  const donateArray = [];

  for (const item of items) {
    if (item.rating <= 3) {
      donateArray.push(item);
    }
  }

  const donateResults = donateArray.map(item => (
    <p>
      <i>
        <u>{item.name}</u>
      </i>
    </p>
  ));

  const decisionText = () => {
    if (!donateArray.length) {
      return 'You enjoy all the things! Maybe think a bit harder...';
    }
    return 'Consider donating or selling these items...';
  };

  return (
    <>
      <div>
        <h4>{decisionText()}</h4>
        {donateResults}
      </div>
    </>
  );
}

const DecisionTable = ({ items }) => {
  const [toggled, setToggle] = useState(false);
  console.log(!toggled);

  return (
    <>
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
    </>
  );
};

export default DecisionTable;
