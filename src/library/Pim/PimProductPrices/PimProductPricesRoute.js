/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import AesirxApiInstance from 'aesirx-dma-lib/src/gateway/Instance';
import BaseRoute from 'aesirx-dma-lib/src/Abstract/BaseRoute';

class PimProductPricesRoute extends BaseRoute {
  option = 'reditem-item_price_51';

  getList = (filters) => {
    const buildFilters = this.createFilters(filters);
    return AesirxApiInstance.get(
      this.createRequestURL({
        option: this.option,
        'list[ordering]': 'id',
        'list[direction]': 'desc',
        ...buildFilters,
      })
    );
  };

  createFilters = (filters) => {
    let buildFilter = {};
    for (const [key, value] of Object.entries(filters)) {
      if (typeof value === 'object') {
        switch (value.type) {
          case 'custom_fields':
            buildFilter['filter[' + value.type + '][' + key + '][]'] = value.value;
            break;
          case 'filter':
            buildFilter['filter[' + key + ']'] = value.value;
            break;
          default:
            break;
        }
      } else {
        buildFilter[key] = value;
      }
    }

    return buildFilter;
  };

  updateStatus = (listSelected) => {
    return AesirxApiInstance.post(
      this.createRequestURL({
        option: this.option,
        task: 'bulkUpdate',
      }),
      {
        items: listSelected,
      }
    );
  };

  updatePrices = (listPrices) => {
    return AesirxApiInstance.post(
      this.createRequestURL({
        option: this.option,
        task: 'bulkUpdate',
      }),
      {
        items: listPrices,
      }
    );
  };
}

export default PimProductPricesRoute;