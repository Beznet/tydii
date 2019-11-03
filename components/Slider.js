import React, { useState } from 'react';

const Slider = () => {
  const [ value, setValue ] = useState()

  console.log(value)

  return (
    <>
      <input
      type="range" 
      className="slider" 
      name="customRange"
      value={value}
      onChange={(e) => setValue(e.target.value)} 
      min="1" 
      max="5" 
    />
    <p>Item Rating: {value}</p>
  </>
  )
}
export default Slider;