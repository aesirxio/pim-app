/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import BaseItemModel from 'aesirx-dma-lib/src/Abstract/BaseItemModel';
import BaseModel from 'store/Models/Abstract/BaseModel';
import { PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY } from '../../Constant/PimConstant';
class DebtorGroupModel extends BaseModel {
  constructor(entities) {
    super(entities);
    if (entities) {
      this.items = entities._embedded.item.map((element) => {
        return new DebtorGroupItemModel(element);
      });
    }
  }
}
class DebtorGroupItemModel extends BaseItemModel {
  id = null;
  title = null;
  debtor_code = null;

  constructor(entity) {
    super(entity);
    if (entity) {
      this.id = entity[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.ID] ?? '';
      this.title = entity[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.TITLE] ?? '';
      this.debtor_code = entity[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.DEBTOR_CODE] ?? '';
    }
  }

  toObject = () => {
    return {};
  };

  toJSON = () => {
    return {
      ...this.baseToJSON(),
      [PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.ID]: this.id,
      [PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.TITLE]: this.title,
      [PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.DEBTOR_CODE]: this.debtor_code,
    };
  };

  static __transformItemToApiOfCreation = (data) => {
    let formData = new FormData();
    const excluded = [PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.ID];
    Object.keys(PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY).forEach((index) => {
      if (!excluded.includes(index) && data[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY[index]]) {
        formData.append(
          [PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY[index]],
          data[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY[index]]
        );
      }
    });
    formData.append(
      [PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.ID],
      data[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY.ID] ?? 0
    );
    return formData;
  };

  static __transformItemToApiOfUpdation = (data) => {
    let formData = {};
    const excluded = [];
    Object.keys(PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY).forEach((index) => {
      if (!excluded.includes(index) && data[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY[index]]) {
        formData[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY[index]] =
          data[PIM_DEBTOR_GROUP_DETAIL_FIELD_KEY[index]];
      }
    });
    return formData;
  };
}

export { DebtorGroupItemModel, DebtorGroupModel };
