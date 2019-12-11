import React, { useState } from 'react';
import { Button } from 'reactstrap';
 
function DonateItems ({items}) {
  const donateArray = [];

  for (const item of items) {
    if (item.rating<=3) {
      donateArray.push(item)
    }
  }

  let donateResults = (
    donateArray.map(item => (
      <p>{item.name}</p>
    ))
  )
  
  return (
    donateResults
  )
}

const DecisionTable = ({items}) => {
  let [toggled, setToggle] = useState(false)
  console.log(toggled)

  return (
    <>
      <Button onClick={() => { setToggle(!toggled) }}> Analyze </Button>
      <div className={toggled ? "d-none": ""}>
        <h3>Items to donate...</h3>
        <DonateItems items={items} />
      </div>
    </>
  )
}

export default DecisionTable;
