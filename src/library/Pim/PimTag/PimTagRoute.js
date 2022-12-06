/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import AesirxApiInstance from 'aesirx-dma-lib/src/gateway/Instance';
import BaseRoute from 'aesirx-dma-lib/src/Abstract/BaseRoute';

class PimTagRoute extends BaseRoute {
  option = 'reditem-category_tag_44';

  getList = (dataFilter = {}) => {
    return AesirxApiInstance.get(
      this.createRequestURL({
        option: this.option,
        ...dataFilter,
      })
    );
  };
}

export default PimTagRoute;
