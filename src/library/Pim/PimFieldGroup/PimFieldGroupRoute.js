/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import AesirxApiInstance from 'aesirx-dma-lib/src/gateway/Instance';
import BaseRoute from 'aesirx-dma-lib/src/Abstract/BaseRoute';

class PimFieldGroupRoute extends BaseRoute {
  option = 'reditem-pim_field_group';

  createFilter = (filter) => {
    let buildFilter = {};
    for (const [key, value] of Object.entries(filter)) {
      if (Array.isArray(value)) {
        buildFilter['filter[' + key + '][]'] = value;
      } else {
        buildFilter['filter[' + key + ']'] = value;
      }
    }

    return buildFilter;
  };

  getList = (filter = {}) => {
    const buildFilter = this.createFilter(filter);
    return AesirxApiInstance().get(
      this.createRequestURL({
        option: this.option,
        ...buildFilter,
      })
    );
  };

  getDetail = (id = 0, filter = {}) => {
    return AesirxApiInstance().get(
      this.createRequestURL({
        option: this.option,
        id: id,
        ...filter,
      })
    );
  };

  create = (data) => {
    return AesirxApiInstance().post(
      this.createRequestURL({
        option: this.option,
      }),
      data
    );
  };
  update = (data) => {
    return AesirxApiInstance().put(
      this.createRequestURL({
        option: this.option,
      }),
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  };
  delete = (id) => {
    return AesirxApiInstance().delete(
      this.createRequestURL({
        option: this.option,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: { id: id },
      }
    );
  };
}

export default PimFieldGroupRoute;
