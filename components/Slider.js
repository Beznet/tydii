import React from 'react';

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
      <input type="range" value={value} onChange={onChange} min="1" max="5" />
      <img
        className="face-img pt-n2"
        src={faceImages[value]}
        alt="face-rating"
      />
    </>
  );
};
export default Slider;
