/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { AesirxPimFieldApiService } from 'aesirx-lib';
import { AesirxPimUtilApiService } from 'aesirx-lib';
import { FieldItemModel } from 'aesirx-lib';
import { runInAction } from 'mobx';

export default class FieldStore {
  async create(createFieldData) {
    try {
      const convertedUpdateGeneralData =
        FieldItemModel.__transformItemToApiOfCreation(createFieldData);
      let resultOnSave;
      const createFieldApiService = new AesirxPimFieldApiService();

      resultOnSave = await createFieldApiService.create(convertedUpdateGeneralData);
      if (resultOnSave?.result) {
        return { error: false, response: resultOnSave?.result };
      } else {
        return { error: true, response: { message: 'Something went wrong from Server response' } };
      }
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async update(updateFieldData) {
    try {
      const convertedUpdateGeneralData =
        FieldItemModel.__transformItemToApiOfUpdation(updateFieldData);

      let resultOnSave;
      const updateFieldApiService = new AesirxPimFieldApiService();

      resultOnSave = await updateFieldApiService.update(convertedUpdateGeneralData);
      if (resultOnSave?.result) {
        return { error: false, response: resultOnSave?.result };
      } else {
        return { error: true, response: { message: 'Something went wrong from Server response' } };
      }
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async updateStatus(arr, status) {
    try {
      const updateStatusAPIService = new AesirxPimFieldApiService();
      const respondedData = await updateStatusAPIService.updateStatus(arr, status);
      return { error: false, response: respondedData };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async getDetail(id) {
    if (!id) return false;

    try {
      const results = true;

      if (results) {
        const getDetailInfoAPIService = new AesirxPimFieldApiService();

        const respondedData = await getDetailInfoAPIService.getDetail(id);

        if (respondedData) {
          return { error: false, response: respondedData };
        } else {
          return {
            error: true,
            response: { message: 'Something went wrong from Server response' },
          };
        }
      }
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async getList(filter, filterList) {
    try {
      const getListInfoAPIService = new AesirxPimFieldApiService();
      const respondedData = await getListInfoAPIService.getList(filter, filterList);
      return { error: false, response: respondedData };
    } catch (error) {
      return { error: true, response: error?.response?.data };
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
      return { error: false, response: respondedData };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }
}
