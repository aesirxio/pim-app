/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import './index.scss';

class PulseLoaderComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className={`${this.props.className} position-absolute top-50 start-50 translate-middle zindex-1 w-100 h-100`}
      >
        <PulseLoader color={`#1ab394`} size={`${this.props.size ?? '15px'}`} />
      </div>
    );
  }
}

export default PulseLoaderComponent;
