import { PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY } from 'aesirx-lib';
/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import { PAGE_STATUS, notify } from 'aesirx-uikit';
class ProductFieldValueDetailViewModel {
  formStatus = PAGE_STATUS.READY;
  productFieldValueDetailViewModel = { formPropsData: [{}] };
  aliasChange = '';
  productFieldValueList = [];
  successResponse = {
    state: true,
    content_id: '',
    filters: { limit: 0 },
  };

  constructor(productFieldValueStore) {
    makeAutoObservable(this);
    this.productFieldValueStore = productFieldValueStore;
  }

  setForm = (productFieldValueDetailViewModel) => {
    this.productFieldValueDetailViewModel = productFieldValueDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.productFieldValueStore.getDetail(
      this.productFieldValueDetailViewModel.formPropsData[
        PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY.ID
      ]
    );

    runInAction(() => {
      if (!data?.error) {
        this.onGetProductFieldValueSuccessHandler(data?.response);
      } else {
        this.onErrorHandler(data?.response);
      }
    });
  };

  getProductFieldValueList = async () => {
    runInAction(() => {
      this.formStatus = PAGE_STATUS.LOADING;
    });
    const data = await this.productFieldValueStore.getList(this.successResponse.filters);

    runInAction(() => {
      if (!data?.error) {
        this.onSuccessHandler(data?.response, '');
      } else {
        this.onErrorHandler(data?.response);
      }
    });
  };

  create = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.productFieldValueStore.create(
      this.productFieldValueDetailViewModel.formPropsData
    );

    runInAction(() => {
      if (!data?.error) {
        this.onSuccessHandler(data?.response, 'Created successfully');
      } else {
        this.onErrorHandler(data?.response);
      }
    });
    return data;
  };

  update = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.productFieldValueStore.update(
      this.productFieldValueDetailViewModel.formPropsData
    );

    runInAction(() => {
      if (!data?.error) {
        this.onSuccessHandler(data?.response, 'Updated successfully');
      } else {
        this.onErrorHandler(data?.response);
      }
    });
    return data;
  };

  onErrorHandler = (error) => {
    Array.isArray(error?._messages) && error?._messages[0]?.message
      ? notify(error._messages[0]?.message, 'error')
      : error.message && notify(error.message, 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
    this.formStatus = PAGE_STATUS.READY;
  };

  onSuccessHandler = (result, message) => {
    if (result && message) {
      notify(message, 'success');
    }
    if (result?.listItems) {
      this.productFieldValueList = result?.listItems;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  onGetProductFieldValueSuccessHandler = (result) => {
    if (result && result[PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY.ID]) {
      this.productFieldValueDetailViewModel.formPropsData = {
        ...this.productFieldValueDetailViewModel.formPropsData,
        ...Object.keys(PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY[index]]:
                result[PIM_PRODUCT_FIELD_VALUE_DETAIL_FIELD_KEY[index]],
            };
          })
          .reduce((prev, cur) => ({ ...prev, ...cur })),
      };
      this.formStatus = PAGE_STATUS.READY;
    }
  };

  onGetProductFieldValueListSuccessHandler = (result) => {
    if (result) {
      this.productFieldValueList = result;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  handleFormPropsData = (key, value) => {
    if (key && value !== null) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(this.productFieldValueDetailViewModel.formPropsData[key], value);
      } else {
        this.productFieldValueDetailViewModel.formPropsData[key] = value;
      }
    }
  };
  handleAliasChange = (value) => {
    this.aliasChange = value;
  };
}

export default ProductFieldValueDetailViewModel;
