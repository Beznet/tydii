import React, { useState } from 'react'
import { Button } from 'reactstrap'
 
function DonateItems ({items}) {
  const donateArray = []

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

  let decisionText = () => {
    if (!donateArray.length) {
      return "No items to donate"
    } 
    return "Items to donate..."
  }
  
  return (
    <>
      <div>
        <h3>{decisionText()}</h3>
        {donateResults}
      </div>
    </>
  )
}

const DecisionTable = ({items}) => {
  let [toggled, setToggle] = useState(false)
  console.log(!toggled)

  return (
    <>
      <Button onClick={() => { setToggle(!toggled) }}> Analyze </Button>
      <div className={!toggled ? "d-none": ""}>
        <DonateItems items={items} />
      </div>
    </>
  )
}

export default DecisionTable;
