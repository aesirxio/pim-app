/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import AesirxPimCategoryApiService from 'library/Pim/PimCategory/PimCategory';
import AesirxPimProductApiService from 'library/Pim/PimProduct/PimProduct';
import { ProductItemModel } from 'library/Pim/PimProduct/PimProductModel';
import AesirxPimUtilApiService from 'library/Pim/PimUtils/PimUtils';
import { runInAction } from 'mobx';

export default class ProductStore {
  async create(createProductData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData =
        ProductItemModel.__transformItemToApiOfCreation(createProductData);

      let resultOnSave;

      const createProductApiService = new AesirxPimProductApiService();

      resultOnSave = await createProductApiService.create(convertedUpdateGeneralData);

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
    }
  }

  async update(updateProductData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData =
        ProductItemModel.__transformItemToApiOfUpdation(updateProductData);
      let resultOnSave;
      const updateProductApiService = new AesirxPimProductApiService();

      resultOnSave = await updateProductApiService.update(convertedUpdateGeneralData);
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

  async getProductDetail(id, callbackOnSuccess, callbackOnError) {
    if (!id) return false;

    try {
      const results = true;

      if (results) {
        const getDetailInfoAPIService = new AesirxPimProductApiService();

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

  async getListCategories(callbackOnSuccess, callbackOnError) {
    try {
      const getPimCategoyAPIService = new AesirxPimCategoryApiService();
      const respondedData = await getPimCategoyAPIService.getList({ 'list[limit]': 9999 });

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

  async getList(callbackOnSuccess, callbackOnError, filters) {
    console.log('filters', filters);

    try {
      const getPimProductAPIService = new AesirxPimProductApiService();
      const respondedData = await getPimProductAPIService.getList(filters);
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

  async getDetailProduct(id) {
    if (!id) return false;

    try {
      const getDetailInfoAPIService = new AesirxPimProductApiService();
      const respondedData = await getDetailInfoAPIService.getDetailInfo(id);
      return respondedData;
    } catch (error) {
      // no error throw
    }

    return false;
  }

  async updateStatus(arr, status) {
    try {
      const updateStatusAPIService = new AesirxPimProductApiService();
      const respondedData = await updateStatusAPIService.updateStatus(arr, status);
      return respondedData;
    } catch (error) {
      // no error throw
    }

    return false;
  }
}
