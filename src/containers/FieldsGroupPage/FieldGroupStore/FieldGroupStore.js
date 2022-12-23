/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { AesirxPimFieldGroupApiService } from 'aesirx-dma-lib';
import { FieldGroupItemModel } from 'aesirx-dma-lib/src/Pim/PimFieldGroup/PimFieldGroupModel';
// import { FieldGroupItemModel } from 'aesirx-dma-lib';
import { runInAction } from 'mobx';

export default class FieldGroupStore {
  async create(createFieldGroupData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData =
        FieldGroupItemModel.__transformItemToApiOfCreation(createFieldGroupData);

      let resultOnSave;
      const createFieldGroupApiService = new AesirxPimFieldGroupApiService();

      resultOnSave = await createFieldGroupApiService.create(convertedUpdateGeneralData);
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

  async update(updateFieldGroupData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData =
        FieldGroupItemModel.__transformItemToApiOfUpdation(updateFieldGroupData);

      let resultOnSave;
      const updateFieldGroupApiService = new AesirxPimFieldGroupApiService();

      resultOnSave = await updateFieldGroupApiService.update(convertedUpdateGeneralData);
      if (resultOnSave) {
        runInAction(() => {
          callbackOnSuccess(resultOnSave);
        });
      } else {
        runInAction(() => {
          callbackOnError(resultOnSave);
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async updateStatus(arr, status) {
    try {
      const updateStatusAPIService = new AesirxPimFieldGroupApiService();
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
        const getDetailInfoAPIService = new AesirxPimFieldGroupApiService();

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

  async getList(filter, callbackOnSuccess, callbackOnError) {
    try {
      const getListInfoAPIService = new AesirxPimFieldGroupApiService();
      const respondedData = await getListInfoAPIService.getList(filter);

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
}
