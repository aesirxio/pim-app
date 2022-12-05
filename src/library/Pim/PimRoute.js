/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import AesirxApiInstance from 'aesirx-dma-lib/src/gateway/Instance';
import BaseRoute from 'aesirx-dma-lib/src/Abstract/BaseRoute';

class PimRoute extends BaseRoute {
  getDetail = (id = 0, dataFilter = {}) => {
    return AesirxApiInstance.get(
      this.createRequestURL({
        option: 'reditem-item_pim_product_59',
        id: id,
        ...dataFilter,
      })
    );
  };

  createProduct = (data) => {
    return AesirxApiInstance.post(
      this.createRequestURL({
        option: 'reditem-item_pim_product_59',
      }),
      data
    );
  };
  updateProduct = (data) => {
    return AesirxApiInstance.put(
      this.createRequestURL({
        option: 'reditem-item_pim_product_59',
      }),
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  };
  deleteProduct = (id) => {
    return AesirxApiInstance.delete(
      this.createRequestURL({
        option: 'reditem-item_pim_product_59',
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

export default PimRoute;
