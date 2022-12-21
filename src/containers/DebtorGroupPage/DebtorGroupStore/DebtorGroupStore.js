/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import AesirxPimDebtorGroupApiService from 'library/Pim/PimDebtorGroup/PimDebtorGroup';
import { DebtorGroupItemModel } from 'library/Pim/PimDebtorGroup/PimDebtorGroupModel';
import AesirxPimUtilApiService from 'library/Pim/PimUtils/PimUtils';
import { runInAction } from 'mobx';

export default class DebtorGroupStore {
  async create(createDebtorGroupData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData =
        DebtorGroupItemModel.__transformItemToApiOfCreation(createDebtorGroupData);
      let resultOnSave;
      const createDebtorGroupApiService = new AesirxPimDebtorGroupApiService();

      resultOnSave = await createDebtorGroupApiService.create(convertedUpdateGeneralData);
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
      return false;
    }
  }

  async update(updateDebtorGroupData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData =
        DebtorGroupItemModel.__transformItemToApiOfUpdation(updateDebtorGroupData);

      let resultOnSave;
      const updateDebtorGroupApiService = new AesirxPimDebtorGroupApiService();

      resultOnSave = await updateDebtorGroupApiService.update(convertedUpdateGeneralData);
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
        const getDetailInfoAPIService = new AesirxPimDebtorGroupApiService();

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
      const getListInfoAPIService = new AesirxPimDebtorGroupApiService();
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

  async updateStatus(arr, status) {
    try {
      const updateStatusAPIService = new AesirxPimDebtorGroupApiService();
      const respondedData = await updateStatusAPIService.updateStatus(arr, status);
      return respondedData;
    } catch (error) {
      // no error throw
    }

    return false;
  }
}
