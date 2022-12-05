/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import BaseItemModel from 'aesirx-dma-lib/src/Abstract/BaseItemModel';
import { PIM_PRODUCT_DETAIL_FIELD_KEY } from '../Constant/PimConstant';
class ProductDetailModel extends BaseItemModel {
  id = null;
  sku = null;
  title = null;
  published = 0;
  featured = 0;
  category_id = null;
  custom_fields = null;

  constructor(entity) {
    super(entity);
    if (entity) {
      this.id = entity[PIM_PRODUCT_DETAIL_FIELD_KEY.ID] ?? '';
      this.sku = entity[PIM_PRODUCT_DETAIL_FIELD_KEY.SKU] ?? 0;
      this.title = entity[PIM_PRODUCT_DETAIL_FIELD_KEY.TITLE] ?? '';
      this.published = entity[PIM_PRODUCT_DETAIL_FIELD_KEY.PUBLISHED] ?? 0;
      this.featured = entity[PIM_PRODUCT_DETAIL_FIELD_KEY.FEATURED] ?? 0;
      this.category_id = entity[PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_ID] ?? 0;
      this.custom_fields = entity[PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS] ?? 0;
    }
  }

  toObject = () => {
    return {};
  };

  toJSON = () => {
    return {
      ...this.baseToJSON(),
      [PIM_PRODUCT_DETAIL_FIELD_KEY.ID]: this.id,
      [PIM_PRODUCT_DETAIL_FIELD_KEY.SKU]: this.sku,
      [PIM_PRODUCT_DETAIL_FIELD_KEY.TITLE]: this.title,
      [PIM_PRODUCT_DETAIL_FIELD_KEY.PUBLISHED]: this.published,
      [PIM_PRODUCT_DETAIL_FIELD_KEY.FEATURED]: this.featured,
      [PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_ID]: this.category_id,
      [PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS]: this.custom_fields,
    };
  };

  static __transformItemToApiOfCreation = (data) => {
    let formData = new FormData();
    const excluded = [PIM_PRODUCT_DETAIL_FIELD_KEY.ID];
    Object.keys(PIM_PRODUCT_DETAIL_FIELD_KEY).forEach((index) => {
      if (!excluded.includes(index) && data[PIM_PRODUCT_DETAIL_FIELD_KEY[index]]) {
        formData.append(
          [PIM_PRODUCT_DETAIL_FIELD_KEY[index]],
          data[PIM_PRODUCT_DETAIL_FIELD_KEY[index]]
        );
      }
    });
    formData.append([PIM_PRODUCT_DETAIL_FIELD_KEY.ID], data[PIM_PRODUCT_DETAIL_FIELD_KEY.ID] ?? 0);
    return formData;
  };

  static __transformItemToApiOfUpdation = (data) => {
    let formData = {};
    const excluded = [];
    Object.keys(PIM_PRODUCT_DETAIL_FIELD_KEY).forEach((index) => {
      if (!excluded.includes(index) && data[PIM_PRODUCT_DETAIL_FIELD_KEY[index]]) {
        formData[PIM_PRODUCT_DETAIL_FIELD_KEY[index]] = data[PIM_PRODUCT_DETAIL_FIELD_KEY[index]];
      }
    });
    return formData;
  };
}

export { ProductDetailModel };
