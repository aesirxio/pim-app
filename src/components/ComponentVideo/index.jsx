/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

const ComponentVideo = (props) => {
  return (
    <div className="w-100 h-100" key={props.src}>
      <video className="w-100" muted loop controls>
        <source src={props.src} type="video/webm" />
      </video>
    </div>
  );
};

export default ComponentVideo;
