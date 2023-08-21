/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { AesirxPimCategoryApiService } from 'aesirx-lib';
import { AesirxPimProductApiService } from 'aesirx-lib';
import { AesirxPimUtilApiService } from 'aesirx-lib';
import { ProductItemModel } from 'aesirx-lib';

export default class ProductStore {
  async create(createProductData) {
    try {
      const convertedUpdateGeneralData =
        ProductItemModel.__transformItemToApiOfCreation(createProductData);

      let resultOnSave;

      const aesirxPimProductApiService = new AesirxPimProductApiService();

      resultOnSave = await aesirxPimProductApiService.create(convertedUpdateGeneralData);
      return { error: false, response: resultOnSave?.result };
    } catch (error) {
      console.error(error);
      return { error: true, response: error?.response?.data };
    }
  }

  async update(updateProductData) {
    try {
      const convertedUpdateGeneralData =
        ProductItemModel.__transformItemToApiOfUpdation(updateProductData);
      let resultOnSave;
      const aesirxPimProductApiService = new AesirxPimProductApiService();

      resultOnSave = await aesirxPimProductApiService.update(convertedUpdateGeneralData);

      return { error: false, response: resultOnSave?.result };
    } catch (error) {
      console.error(error);
      return { error: true, response: error?.response?.data };
    }
  }

  async getProductDetail(id) {
    if (!id) return false;

    try {
      const results = true;

      if (results) {
        const aesirxPimProductApiService = new AesirxPimProductApiService();

        const respondedData = await aesirxPimProductApiService.getDetail(id);

        return { error: false, response: respondedData };
      }
    } catch (error) {
      console.error(error);
      return { error: true, response: error?.response?.data };
    }
  }

  async getListCategories() {
    try {
      const aesirxPimCategoryApiService = new AesirxPimCategoryApiService();
      const respondedData = await aesirxPimCategoryApiService.getList({ 'list[limit]': 9999 });

      return { error: false, response: respondedData };
    } catch (error) {
      console.error(error);
      return { error: true, response: error?.response?.data };
    }
  }

  async getList(filters) {
    try {
      const aesirxPimProductApiService = new AesirxPimProductApiService();
      const respondedData = await aesirxPimProductApiService.getList(filters);
      return { error: false, response: respondedData };
    } catch (error) {
      console.error(error);
      return { error: true, response: error?.response?.data };
    }
  }

  async getListPublishStatus() {
    try {
      const aesirxPimUtilApiService = new AesirxPimUtilApiService();
      const respondedData = await aesirxPimUtilApiService.getListPublishStatus();
      return { error: false, response: respondedData };
    } catch (error) {
      console.error(error);
      return { error: true, response: error?.response?.data };
    }
  }

  async getDetailProduct(id) {
    if (!id) return false;

    try {
      const aesirxPimProductApiService = new AesirxPimProductApiService();
      const respondedData = await aesirxPimProductApiService.getDetailInfo(id);
      return { error: false, response: respondedData };
    } catch (error) {
      console.error(error);
      return { error: true, response: error?.response?.data };
    }
  }

  async updateStatus(arr, status) {
    try {
      const aesirxPimProductApiService = new AesirxPimProductApiService();
      const respondedData = await aesirxPimProductApiService.updateStatus(arr, status);
      return { error: false, response: respondedData };
    } catch (error) {
      console.error(error);
      return { error: true, response: error?.response?.data };
    }
  }

  async deleteProducts(arr) {
    try {
      const aesirxPimProductApiService = new AesirxPimProductApiService();
      const respondedData = await aesirxPimProductApiService.deleteProducts(arr);
      return { error: false, response: respondedData };
    } catch (error) {
      console.error(error);
      return { error: true, response: error?.response?.data };
    }
  }
}
