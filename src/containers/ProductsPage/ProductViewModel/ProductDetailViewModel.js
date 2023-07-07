/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable, runInAction } from 'mobx';
import { notify } from 'aesirx-uikit';
import { PIM_PRODUCT_DETAIL_FIELD_KEY } from 'aesirx-lib';
class ProductDetailViewModel {
  productStore = null;
  formStatus = PAGE_STATUS.READY;
  productDetailViewModel = null;
  aliasChange = '';
  productType = '';
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(productStore) {
    makeAutoObservable(this);
    this.productStore = productStore;
  }

  setForm = (productDetailViewModel) => {
    this.productDetailViewModel = productDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.productStore.getProductDetail(
      this.productDetailViewModel.formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.ID]
    );

    runInAction(() => {
      if (!data?.error) {
        this.onGetProductSuccessHandler(data?.response);
      } else {
        this.onErrorHandler(data?.response);
      }
    });
  };

  create = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.productStore.create(this.productDetailViewModel.formPropsData);

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
    const data = await this.productStore.update(this.productDetailViewModel.formPropsData);

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
      ? notify(error?._messages[0]?.message, 'error')
      : error?.message && notify(error?.message, 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
    this.formStatus = PAGE_STATUS.READY;
  };

  onSuccessHandler = (result, message) => {
    if (result && message) {
      notify(message, 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  onGetProductSuccessHandler = (result) => {
    if (result && result[PIM_PRODUCT_DETAIL_FIELD_KEY.ID]) {
      this.productDetailViewModel.formPropsData = {
        ...this.productDetailViewModel.formPropsData,
        ...Object.keys(PIM_PRODUCT_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [PIM_PRODUCT_DETAIL_FIELD_KEY[index]]: result[PIM_PRODUCT_DETAIL_FIELD_KEY[index]],
            };
          })
          .reduce((prev, cur) => ({ ...prev, ...cur })),
      };
      this.formStatus = PAGE_STATUS.READY;
    }
  };

  handleFormPropsData = (key, value) => {
    if (key && value !== null) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(this.productDetailViewModel.formPropsData[key], value);
      } else {
        this.productDetailViewModel.formPropsData[key] = value;
      }
    }
  };

  handleProductType = (value) => {
    runInAction(() => {
      this.productType = value;
    });
  };

  handleAliasChange = (value) => {
    this.aliasChange = value?.replace(/ /g, '-').toString().toLowerCase();
  };
}

export default ProductDetailViewModel;
