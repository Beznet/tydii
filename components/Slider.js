import React from 'react';
import { CustomInput } from 'reactstrap';

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
      <div className="d-inline-block mr-3">
        <CustomInput
          type="range"
          className="slider"
          name="customRange"
          value={value}
          onChange={onChange}
          min="1"
          max="5"
        />
      </div>
      <img className="face-img" src={faceImages[value]} alt="face-rating" />
    </>
  );
};
export default Slider;
