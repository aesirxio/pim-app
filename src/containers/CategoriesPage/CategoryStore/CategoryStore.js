/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { AesirxPimCategoryApiService } from 'aesirx-lib';
import { AesirxPimUtilApiService } from 'aesirx-lib';
import { CategoryItemModel } from 'aesirx-lib';
import { runInAction } from 'mobx';

export default class CategoryStore {
  async createCategory(createCategoryData) {
    try {
      const convertedUpdateGeneralData =
        CategoryItemModel.__transformItemToApiOfCreation(createCategoryData);
      let resultOnSave;
      const createCategoryApiService = new AesirxPimCategoryApiService();

      resultOnSave = await createCategoryApiService.create(convertedUpdateGeneralData);
      return { error: false, response: resultOnSave?.result };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async updateCategory(updateCategoryData) {
    try {
      const convertedUpdateGeneralData =
        CategoryItemModel.__transformItemToApiOfUpdation(updateCategoryData);

      let resultOnSave;

      const updateCategoryApiService = new AesirxPimCategoryApiService();
      resultOnSave = await updateCategoryApiService.update(convertedUpdateGeneralData);

      return { error: false, response: resultOnSave?.result };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async getDetail(id) {
    if (!id) return false;

    try {
      const results = true;

      if (results) {
        const getDetailInfoAPIService = new AesirxPimCategoryApiService();

        const respondedData = await getDetailInfoAPIService.getDetail(id);
        return { error: false, response: respondedData };
      }
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async getList(filters) {
    try {
      const getListAPIService = new AesirxPimCategoryApiService();
      const respondedData = await getListAPIService.getList(filters);
      return { error: false, response: respondedData };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async getListWithoutPagination() {
    try {
      const aesirxPimCategoryApiService = new AesirxPimCategoryApiService();
      const respondedData = await aesirxPimCategoryApiService.getList({ 'list[limit]': 9999 });

      return { error: false, response: respondedData };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async getListPublishStatus() {
    try {
      const getAesirxPimUtilApiService = new AesirxPimUtilApiService();
      const respondedData = await getAesirxPimUtilApiService.getListPublishStatus();
      return { error: false, response: respondedData };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async updateStatus(arr, status) {
    try {
      const updateStatusAPIService = new AesirxPimCategoryApiService();
      const respondedData = await updateStatusAPIService.updateStatus(arr, status);
      return { error: false, response: respondedData };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }

  async deleteCategories(arr) {
    try {
      const aesirxPimCategoryApiService = new AesirxPimCategoryApiService();
      const respondedData = await aesirxPimCategoryApiService.deleteCategories(arr);
      return { error: false, response: respondedData };
    } catch (error) {
      return { error: true, response: error?.response?.data };
    }
  }
}
