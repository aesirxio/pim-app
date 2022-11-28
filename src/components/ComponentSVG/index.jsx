import React from 'react';

function ComponentSVG({ url, width, height, color, className }) {
  return (
    <span
      className={`icon d-inline-block align-text-bottom ms-auto ${className}`}
      style={{
        WebkitMaskImage: `url(${url})`,
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        width: width ?? '24px',
        height: height ?? '24px',
        ...(color && {
          backgroundColor: color ? `${color}` : 'var(--body-color)',
        }),
      }}
    ></span>
  );
}

export default ComponentSVG;
