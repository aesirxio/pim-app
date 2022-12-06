/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import AesirxPimApiService from 'library/Pim/Pim';
import { CategoryDetailModel } from 'library/Pim/PimModel';
import { runInAction } from 'mobx';

export default class CategoryStore {
  async createCategory(createCategoryData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData =
        CategoryDetailModel.__transformItemToApiOfCreation(createCategoryData);

      let resultOnSave;
      const createCategoryApiService = new AesirxPimApiService();

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
        CategoryDetailModel.__transformItemToApiOfUpdation(updateCategoryData);

      let resultOnSave;
      const updateCategoryApiService = new AesirxPimApiService();

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
        const getDetailInfoAPIService = new AesirxPimApiService();

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
}
