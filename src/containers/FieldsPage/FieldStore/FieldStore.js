/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { AesirxPimFieldApiService } from 'aesirx-dma-lib';
import { AesirxPimUtilApiService } from 'aesirx-dma-lib';
import { FieldItemModel } from 'aesirx-dma-lib';
import { runInAction } from 'mobx';

export default class FieldStore {
  async create(createFieldData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData =
        FieldItemModel.__transformItemToApiOfCreation(createFieldData);
      let resultOnSave;
      const createFieldApiService = new AesirxPimFieldApiService();

      resultOnSave = await createFieldApiService.create(convertedUpdateGeneralData);
      if (resultOnSave) {
        runInAction(() => {
          callbackOnSuccess(resultOnSave);
        });
      } else {
        runInAction(() => {
          callbackOnError(resultOnSave);
        });
      }
      return resultOnSave;
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async update(updateFieldData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData =
        FieldItemModel.__transformItemToApiOfUpdation(updateFieldData);

      let resultOnSave;
      const updateFieldApiService = new AesirxPimFieldApiService();

      resultOnSave = await updateFieldApiService.update(convertedUpdateGeneralData);
      if (resultOnSave) {
        runInAction(() => {
          callbackOnSuccess(resultOnSave);
        });
      } else {
        runInAction(() => {
          callbackOnError(resultOnSave);
        });
      }
      return resultOnSave;
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async updateStatus(arr, status) {
    try {
      const updateStatusAPIService = new AesirxPimFieldApiService();
      const respondedData = await updateStatusAPIService.updateStatus(arr, status);
      return respondedData;
    } catch (error) {
      // no error throw
    }

    return false;
  }

  async getDetail(id, callbackOnSuccess, callbackOnError) {
    if (!id) return false;

    try {
      const results = true;

      if (results) {
        const getDetailInfoAPIService = new AesirxPimFieldApiService();

        const respondedData = await getDetailInfoAPIService.getDetail(id);

        if (respondedData) {
          runInAction(() => {
            callbackOnSuccess(respondedData);
          });
        } else {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        }
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async getList(filter, filterList, callbackOnSuccess, callbackOnError) {
    try {
      const getListInfoAPIService = new AesirxPimFieldApiService();
      const respondedData = await getListInfoAPIService.getList(filter, filterList);

      if (respondedData) {
        runInAction(() => {
          callbackOnSuccess(respondedData);
        });
      } else {
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async getListPublishStatus(callbackOnSuccess, callbackOnError) {
    try {
      const getAesirxPimUtilApiService = new AesirxPimUtilApiService();
      const respondedData = await getAesirxPimUtilApiService.getListPublishStatus();
      if (respondedData) {
        runInAction(() => {
          callbackOnSuccess(respondedData);
        });
      } else {
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      }
      return respondedData;
    } catch (error) {
      // no error throw
    }

    return false;
  }

  async deleteFields(arr) {
    try {
      const aesirxPimFieldApiService = new AesirxPimFieldApiService();
      const respondedData = await aesirxPimFieldApiService.deleteFields(arr);
      return respondedData;
    } catch (error) {
      // no error throw
    }

    return false;
  }
}
