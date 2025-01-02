import React from 'react';

const Icon = ({ name, attrClass, ratio = 1}) => {
  return (
    <span uk-icon={`icon: ${name}; ratio: ${ratio}`} className={attrClass}></span>
  );
};

export default Icon;