/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import AesirxPimFieldGroupApiService from 'library/Pim/PimFieldGroup/PimFieldGroup';
import { FieldGroupItemModel } from 'library/Pim/PimFieldGroup/PimFieldGroupModel';
import { runInAction } from 'mobx';

export default class FieldGroupStore {
  async create(createFieldGroupData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData =
        FieldGroupItemModel.__transformItemToApiOfCreation(createFieldGroupData);

      let resultOnSave;
      const createFieldGroupApiService = new AesirxPimFieldGroupApiService();

      resultOnSave = await createFieldGroupApiService.createFieldGroup(convertedUpdateGeneralData);
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

  async update(updateFieldGroupData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData =
        FieldGroupItemModel.__transformItemToApiOfUpdation(updateFieldGroupData);

      let resultOnSave;
      const updateFieldGroupApiService = new AesirxPimFieldGroupApiService();

      resultOnSave = await updateFieldGroupApiService.updateFieldGroup(convertedUpdateGeneralData);
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
      const results = true;

      if (results) {
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
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
}
