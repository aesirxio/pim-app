/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { AesirxPimProductPriceApiService } from 'aesirx-lib';
import { AesirxPimUtilApiService } from 'aesirx-lib';
import { ProductPriceItemModel } from 'aesirx-lib';

export default class ProductPriceStore {
  async getList(filters) {
    try {
      const getListAPIService = new AesirxPimProductPriceApiService();
      const respondedData = await getListAPIService.getList(filters);
      return { error: false, response: respondedData };
    } catch (error) {
      console.error(error);
      return { error: true, response: error?.response?.data };
    }
  }

  async getListPublishStatus() {
    try {
      const getAesirxPimUtilApiService = new AesirxPimUtilApiService();
      const respondedData = await getAesirxPimUtilApiService.getListPublishStatus();
      return { error: false, response: respondedData };
    } catch (error) {
      console.error(error);
      return { error: true, response: error?.response?.data };
    }
  }

  async updateStatus(arr, status) {
    try {
      const getUpdateStatusApiService = new AesirxPimProductPriceApiService();
      const respondedData = await getUpdateStatusApiService.updateStatus(arr, status);
      return { error: false, response: respondedData };
    } catch (error) {
      console.error(error);
      return { error: true, response: error?.response?.data };
    }
  }

  async updatePrices(listPrices) {
    try {
      const getUpdatePricesApiService = new AesirxPimProductPriceApiService();
      const respondedData = await getUpdatePricesApiService.updatePrices(listPrices);
      return { error: false, response: respondedData };
    } catch (error) {
      console.error(error);
      return { error: true, response: error?.response?.data };
    }
  }

  async create(createProductPriceData) {
    try {
      const convertedUpdateGeneralData =
        ProductPriceItemModel.__transformItemToApiOfCreation(createProductPriceData);
      let resultOnSave;
      const createProductPriceApiService = new AesirxPimProductPriceApiService();

      resultOnSave = await createProductPriceApiService.create(convertedUpdateGeneralData);
      return { error: false, response: resultOnSave?.result };
    } catch (error) {
      console.error(error);
      return { error: true, response: error?.response?.data };
    }
  }

  async update(updateProductPriceData) {
    try {
      const convertedUpdateGeneralData =
        ProductPriceItemModel.__transformItemToApiOfUpdation(updateProductPriceData);

      let resultOnSave;
      const updateProductPriceApiService = new AesirxPimProductPriceApiService();

      resultOnSave = await updateProductPriceApiService.update(convertedUpdateGeneralData);
      return { error: false, response: resultOnSave?.result };
    } catch (error) {
      console.error(error);
      return { error: true, response: error?.response?.data };
    }
  }

  async getDetail(id) {
    if (!id) return false;

    try {
      const results = true;

      if (results) {
        const getDetailInfoAPIService = new AesirxPimProductPriceApiService();

        const respondedData = await getDetailInfoAPIService.getDetail(id);

        return { error: false, response: respondedData };
      }
    } catch (error) {
      console.error(error);
      return { error: true, response: error?.response?.data };
    }
  }

  async deleteProductPrices(arr) {
    try {
      const aesirxPimProductPriceApiService = new AesirxPimProductPriceApiService();
      const respondedData = await aesirxPimProductPriceApiService.deleteProductPrices(arr);
      return { error: false, response: respondedData };
    } catch (error) {
      console.error(error);
      return { error: true, response: error?.response?.data };
    }
  }
}
