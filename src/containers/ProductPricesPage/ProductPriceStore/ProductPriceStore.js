/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import AesirxPimProductPriceApiService from 'library/Pim/PimProductPrice/PimProductPrice';
import { ProductPriceItemModel } from 'library/Pim/PimProductPrice/PimProductPriceModel';
import AesirxPimUtilApiService from 'library/Pim/PimUtils/PimUtils';
import { runInAction } from 'mobx';

export default class ProductPriceStore {
  async getList(callbackOnSuccess, callbackOnError, filters) {
    try {
      const getListAPIService = new AesirxPimProductPriceApiService();
      const respondedData = await getListAPIService.getList(filters);
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
      const getUpdateStatusApiService = new AesirxPimProductPriceApiService();
      const respondedData = await getUpdateStatusApiService.updateStatus(arr, status);
      return respondedData;
    } catch (error) {
      // no error throw
    }

    return false;
  }

  async updatePrices(listPrices) {
    try {
      const getUpdatePricesApiService = new AesirxPimProductPriceApiService();
      const respondedData = await getUpdatePricesApiService.updatePrices(listPrices);
      return respondedData;
    } catch (error) {
      // no error throw
    }

    return false;
  }

  async create(createProductPriceData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData =
        ProductPriceItemModel.__transformItemToApiOfCreation(createProductPriceData);
      let resultOnSave;
      const createProductPriceApiService = new AesirxPimProductPriceApiService();

      resultOnSave = await createProductPriceApiService.create(convertedUpdateGeneralData);
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

  async update(updateProductPriceData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData =
        ProductPriceItemModel.__transformItemToApiOfUpdation(updateProductPriceData);

      let resultOnSave;
      const updateProductPriceApiService = new AesirxPimProductPriceApiService();

      resultOnSave = await updateProductPriceApiService.update(convertedUpdateGeneralData);
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
        const getDetailInfoAPIService = new AesirxPimProductPriceApiService();

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
