import React from 'react';

const Title = ({ copy, role }) => (
  <h1 aria-label={copy} role={role}>
    {copy.split('').map(function(char, index) {
      const incomingText = { 'animation-delay': `${0.5 + index / 10}s` };
      return (
        <span aria-hidden="true" key={index} style={incomingText}>
          {char}
        </span>
      );
    })}
  </h1>
);

export default Title;
