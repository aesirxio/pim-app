/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import AesirxPimFieldApiService from 'library/Pim/PimField/PimField';
import { FieldItemModel } from 'library/Pim/PimField/PimFieldModel';
import { runInAction } from 'mobx';

export default class FieldStore {
  async createField(createFieldData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData =
        FieldItemModel.__transformItemToApiOfCreation(createFieldData);

      let resultOnSave;
      const createFieldApiService = new AesirxPimFieldApiService();

      resultOnSave = await createFieldApiService.createField(convertedUpdateGeneralData);
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

  async updateField(updateFieldData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData =
        FieldItemModel.__transformItemToApiOfUpdation(updateFieldData);

      let resultOnSave;
      const updateFieldApiService = new AesirxPimFieldApiService();

      resultOnSave = await updateFieldApiService.updateField(convertedUpdateGeneralData);
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

  async getList(filter, callbackOnSuccess, callbackOnError) {
    try {
      const results = true;

      if (results) {
        const getListInfoAPIService = new AesirxPimFieldApiService();
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
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
}
