import React from 'react';

function ComponentSVG({ url, width, height, color, className }) {
  return (
    <span
      className={`icon d-inline-block align-text-bottom ${className}`}
      style={{
        WebkitMaskImage: `url(${url})`,
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        width: width ?? '24px',
        height: height ?? '24px',
        ...(color && {
          backgroundColor: color ? `${color}` : 'var(--bs-body-color)',
        }),
      }}
    ></span>
  );
}

export default ComponentSVG;
