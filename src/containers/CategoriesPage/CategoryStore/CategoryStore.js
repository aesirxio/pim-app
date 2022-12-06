/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import AesirxPimCategoryApiService from 'library/Pim/PimCategory/PimCategory';
import { CategoryItemModel } from 'library/Pim/PimCategory/PimCategoryModel';
import { runInAction } from 'mobx';

export default class CategoryStore {
  async createCategory(createCategoryData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData =
        CategoryItemModel.__transformItemToApiOfCreation(createCategoryData);

      let resultOnSave;
      const createCategoryApiService = new AesirxPimCategoryApiService();

      resultOnSave = await createCategoryApiService.createCategory(convertedUpdateGeneralData);
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

  async updateCategory(updateCategoryData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData =
        CategoryItemModel.__transformItemToApiOfUpdation(updateCategoryData);

      let resultOnSave;
      const updateCategoryApiService = new AesirxPimCategoryApiService();

      resultOnSave = await updateCategoryApiService.updateCategory(convertedUpdateGeneralData);
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
        const getDetailInfoAPIService = new AesirxPimCategoryApiService();

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

  async getList(callbackOnSuccess, callbackOnError) {
    try {
      const results = true;

      if (results) {
        const getListInfoAPIService = new AesirxPimCategoryApiService();

        const respondedData = await getListInfoAPIService.getList();

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
