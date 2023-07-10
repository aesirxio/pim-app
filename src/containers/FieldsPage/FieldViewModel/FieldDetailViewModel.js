/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable, runInAction } from 'mobx';
import { notify } from 'aesirx-uikit';
import { PIM_FIELD_DETAIL_FIELD_KEY } from 'aesirx-lib';
class FieldDetailViewModel {
  fieldStore = null;
  formStatus = PAGE_STATUS.READY;
  fieldDetailViewModel = null;
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(fieldStore) {
    makeAutoObservable(this);
    this.fieldStore = fieldStore;
  }

  setForm = (fieldDetailViewModel) => {
    this.fieldDetailViewModel = fieldDetailViewModel;
  };

  initializeData = async () => {
    runInAction(() => {
      this.formStatus = PAGE_STATUS.LOADING;
    });
    const data = await this.fieldStore.getDetail(
      this.fieldDetailViewModel.formPropsData[PIM_FIELD_DETAIL_FIELD_KEY.ID]
    );

    runInAction(() => {
      if (!data?.error) {
        this.onGetFieldSuccessHandler(data?.response, '');
      } else {
        this.onErrorHandler(data?.response);
      }
      this.formStatus = PAGE_STATUS.READY;
    });
  };

  create = async () => {
    runInAction(() => {
      this.formStatus = PAGE_STATUS.LOADING;
    });
    const data = await this.fieldStore.create(
      this.fieldDetailViewModel.formPropsData,
      this.onSuccessHandler,
      this.onErrorHandler
    );
    runInAction(() => {
      if (!data?.error) {
        this.onSuccessHandler(data?.response, 'Created successfully');
      } else {
        this.onErrorHandler(data?.response);
      }
      this.formStatus = PAGE_STATUS.READY;
    });
    return !data?.error ? data?.response : 0;
  };

  update = async () => {
    runInAction(() => {
      this.formStatus = PAGE_STATUS.LOADING;
    });
    const data = await this.fieldStore.update(this.fieldDetailViewModel.formPropsData);
    runInAction(() => {
      if (!data?.error) {
        this.onSuccessHandler(data?.response, 'Updated successfully');
      } else {
        this.onErrorHandler(data?.response);
      }
      this.formStatus = PAGE_STATUS.READY;
    });
    return !data?.error ? data?.response : 0;
  };

  onErrorHandler = (error) => {
    Array.isArray(error?._messages) && error?._messages[0]?.message
      ? notify(error?._messages[0]?.message, 'error')
      : error?.message && notify(error?.message, 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
  };

  onSuccessHandler = (result, message) => {
    if (result && message) {
      notify(message, 'success');
    }
  };

  onGetFieldSuccessHandler = (result) => {
    if (result && result[PIM_FIELD_DETAIL_FIELD_KEY.ID]) {
      this.fieldDetailViewModel.formPropsData = {
        ...this.fieldDetailViewModel.formPropsData,
        ...Object.keys(PIM_FIELD_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [PIM_FIELD_DETAIL_FIELD_KEY[index]]: result[PIM_FIELD_DETAIL_FIELD_KEY[index]],
            };
          })
          .reduce((prev, cur) => ({ ...prev, ...cur })),
      };
    }
  };

  handleFormPropsData = (key, value, arrayIndex) => {
    if (key && value !== null) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        if (arrayIndex !== undefined) {
          Object.assign(this.fieldDetailViewModel.formPropsData[key][arrayIndex], value);
        } else {
          Object.assign(this.fieldDetailViewModel.formPropsData[key], value);
        }
      } else {
        this.fieldDetailViewModel.formPropsData[key] = value;
      }
    }
  };
}

export default FieldDetailViewModel;
