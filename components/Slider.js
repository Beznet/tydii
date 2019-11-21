import React from 'react';

const Slider = ({value, onValueChange}) => {
  const onChange = e => {
    onValueChange(e.target.value)
  }

  return (
    <>
      <input
      type="range"
      className="slider"
      name="customRange"
      value={value}
      onChange={onChange}
      min="1"
      max="5"
    />
    <p>Item Rating: {value}</p>
  </>
  )
}
export default Slider;
