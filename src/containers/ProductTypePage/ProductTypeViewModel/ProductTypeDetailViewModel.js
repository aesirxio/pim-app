import { ORGANISATION_MEMBER_FIELD } from 'aesirx-lib';
/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import { PAGE_STATUS } from 'constant';
import { notify } from 'components';
class ProductTypeDetailViewModel {
  formStatus = PAGE_STATUS.READY;
  productTypeDetailViewModel = { formPropsData: [{}] };
  aliasChange = '';
  productTypeList = [];
  successResponse = {
    state: true,
    content_id: '',
    filters: {},
  };

  constructor(productTypeStore) {
    makeAutoObservable(this);
    this.productTypeStore = productTypeStore;
  }

  setForm = (productTypeDetailViewModel) => {
    this.productTypeDetailViewModel = productTypeDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.productTypeStore.getDetail(
      this.productTypeDetailViewModel.formPropsData[ORGANISATION_MEMBER_FIELD.ID]
    );

    runInAction(() => {
      if (!data?.error) {
        this.onGetProductTypeSuccessHandler(data?.response);
      } else {
        this.onErrorHandler(data?.response);
      }
    });
  };

  create = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const data = await this.productTypeStore.create(this.productTypeDetailViewModel.formPropsData);

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
    const data = await this.productTypeStore.update(this.productTypeDetailViewModel.formPropsData);

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
    error._messages[0]?.message
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
    this.formStatus = PAGE_STATUS.READY;
  };

  onGetProductTypeSuccessHandler = (result) => {
    if (result) {
      this.productTypeDetailViewModel.formPropsData = {
        ...this.productTypeDetailViewModel.formPropsData,
        ...Object.keys(ORGANISATION_MEMBER_FIELD)
          .map((index) => {
            return {
              [ORGANISATION_MEMBER_FIELD[index]]: result[ORGANISATION_MEMBER_FIELD[index]],
            };
          })
          .reduce((prev, cur) => ({ ...prev, ...cur })),
      };
    }

    this.formStatus = PAGE_STATUS.READY;
  };

  onGetProductTypeListSuccessHandler = (result) => {
    if (result) {
      this.productTypeList = result;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  handleFormPropsData = (key, value) => {
    if (key && value !== null) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(this.productTypeDetailViewModel.formPropsData[key], value);
      } else {
        this.productTypeDetailViewModel.formPropsData[key] = value;
      }
    }
  };
  handleAliasChange = (value) => {
    this.aliasChange = value;
  };
}

export default ProductTypeDetailViewModel;
