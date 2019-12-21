import React from 'react';
import { Col } from 'reactstrap';

const Slider = ({ value, onValueChange }) => {
  const onChange = e => {
    onValueChange(e.target.value);
  };

  return (
    <>
      <div className="d-inline-block mr-2">
        <input
          type="range"
          className="slider"
          name="customRange"
          value={value}
          onChange={onChange}
          min="1"
          max="5"
        />
      </div>
      {/* <div className='d-inline-block'>{value}</div> */}
      <span className="badge badge-primary badge-pill">{value}</span>
    </>
  );
};
export default Slider;
