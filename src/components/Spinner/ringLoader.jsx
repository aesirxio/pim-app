/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import RingLoader from 'react-spinners/RingLoader';
import './index.scss';

class RingLoaderComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className={`${this.props.className} position-absolute top-50 start-50 translate-middle zindex-1 w-100 h-100`}
      >
        <RingLoader color={`#1ab394`} size={`${this.props.size ?? '60px'}`} />
      </div>
    );
  }
}

export default RingLoaderComponent;
