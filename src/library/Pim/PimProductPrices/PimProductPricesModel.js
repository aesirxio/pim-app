/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import BaseItemModel from 'aesirx-dma-lib/src/Abstract/BaseItemModel';
import { PIM_PRICE_FIELD_KEY } from '../../Constant/PimConstant';
class ProductPriceModel extends BaseItemModel {
  id = null;
  published = 0;
  created_user_name = null;
  modifiedTime = null;
  custom_fields = null;
  products = null;

  constructor(entity) {
    super(entity);
    if (entity) {
      this.id = entity[PIM_PRICE_FIELD_KEY.ID] ?? '';
      this.published = entity[PIM_PRICE_FIELD_KEY.PUBLISHED] ?? 0;
      this.created_user_name = entity[PIM_PRICE_FIELD_KEY.CREATED_USER_NAME] ?? '';
      this.modifiedTime = entity[PIM_PRICE_FIELD_KEY.MODIFIED_TIME] ?? '';
      this.custom_fields = entity[PIM_PRICE_FIELD_KEY.CUSTOM_FIELDS] ?? null;
      this.products = entity[PIM_PRICE_FIELD_KEY.PRODUCTS] ?? [];
    }
  }

  toJSON = () => {
    return {
      ...this.baseToJSON(),
      [PIM_PRICE_FIELD_KEY.ID]: this.id,
      [PIM_PRICE_FIELD_KEY.PUBLISHED]: this.published,
      [PIM_PRICE_FIELD_KEY.CREATED_USER_NAME]: this.created_user_name,
      [PIM_PRICE_FIELD_KEY.MODIFIED_TIME]: this.modifiedTime,
      [PIM_PRICE_FIELD_KEY.CUSTOM_FIELDS]: this.custom_fields,
      [PIM_PRICE_FIELD_KEY.PRODUCTS]: this.products,
    };
  };
}

export { ProductPriceModel };
