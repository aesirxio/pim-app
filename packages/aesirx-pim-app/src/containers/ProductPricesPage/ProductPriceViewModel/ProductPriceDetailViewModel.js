/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable, runInAction } from 'mobx';
import { notify } from 'aesirx-uikit';
import { PIM_PRICES_DETAIL_FIELD_KEY } from 'aesirx-lib';
class ProductPriceDetailViewModel {
  productPriceStore = null;
  formStatus = PAGE_STATUS.READY;
  productPriceDetailViewModel = null;
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(productPriceStore) {
    makeAutoObservable(this);
    this.productPriceStore = productPriceStore;
  }

  setForm = (productPriceDetailViewModel) => {
    this.productPriceDetailViewModel = productPriceDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.productPriceStore.getDetail(
      this.productPriceDetailViewModel.formPropsData[PIM_PRICES_DETAIL_FIELD_KEY.ID]
    );
    runInAction(() => {
      if (!data?.error) {
        this.onGetProductPriceSuccessHandler(data?.response, '');
      } else {
        this.onErrorHandler(data?.response);
      }
    });
  };

  create = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.productPriceStore.create(
      this.productPriceDetailViewModel.formPropsData
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
    const data = await this.productPriceStore.update(
      this.productPriceDetailViewModel.formPropsData
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
      ? notify(error?._messages[0]?.message, 'error')
      : error?.message && notify(error?.message, 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error?.result;
    this.formStatus = PAGE_STATUS.READY;
  };

  onSuccessHandler = (result, message) => {
    if (result && message) {
      notify(message, 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  onGetProductPriceSuccessHandler = (result) => {
    if (result && result[PIM_PRICES_DETAIL_FIELD_KEY.ID]) {
      this.productPriceDetailViewModel.formPropsData = {
        ...this.productPriceDetailViewModel.formPropsData,
        ...Object.keys(PIM_PRICES_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [PIM_PRICES_DETAIL_FIELD_KEY[index]]: result[PIM_PRICES_DETAIL_FIELD_KEY[index]],
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
        Object.assign(this.productPriceDetailViewModel.formPropsData[key], value);
      } else {
        this.productPriceDetailViewModel.formPropsData[key] = value;
      }
    }
  };
}

export default ProductPriceDetailViewModel;
