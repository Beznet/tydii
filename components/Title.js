import React from 'react';

const Title = ({ copy, role }) => (
  <span aria-label={copy} role={role}>
    {copy.split('').map((char, index) => (
      <span aria-hidden="true" key={index}>
        {char}
      </span>
    ))}
  </span>
);

export default Title;
