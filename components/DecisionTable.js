import React from 'react';

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

  return (
    <>
      <h3>Items to donate...</h3>
      <DonateItems items={items} />
    </>
  )
}

export default DecisionTable;
