import React from 'react';
import { Col } from 'reactstrap';

const faceImages = [
  '',
  '/sad-1.png',
  '/meh.png',
  '/comfort.png',
  '/happy-3.png',
  '/love.png',
];

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
          default="2"
          min="1"
          max="5"
        />
      </div>
      <span className="badge badge-primary badge-pill">{value}</span>
      <img src={faceImages[value]} alt="face-rating" />
    </>
  );
};
export default Slider;
