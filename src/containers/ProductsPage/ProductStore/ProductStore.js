/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { AesirxPimCategoryApiService } from 'aesirx-dma-lib';
import { AesirxPimProductApiService } from 'aesirx-dma-lib';
import { AesirxPimUtilApiService } from 'aesirx-dma-lib';
import { ProductItemModel } from 'aesirx-dma-lib';
import { runInAction } from 'mobx';

export default class ProductStore {
  async create(createProductData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData =
        ProductItemModel.__transformItemToApiOfCreation(createProductData);

      let resultOnSave;

      const aesirxPimProductApiService = new AesirxPimProductApiService();

      resultOnSave = await aesirxPimProductApiService.create(convertedUpdateGeneralData);

      if (resultOnSave) {
        runInAction(() => {
          callbackOnSuccess(resultOnSave, 'Created successfully');
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
      const aesirxPimProductApiService = new AesirxPimProductApiService();

      resultOnSave = await aesirxPimProductApiService.update(convertedUpdateGeneralData);
      if (resultOnSave) {
        runInAction(() => {
          callbackOnSuccess(resultOnSave, 'Updated successfully');
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
        const aesirxPimProductApiService = new AesirxPimProductApiService();

        const respondedData = await aesirxPimProductApiService.getDetail(id);

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
      const aesirxPimCategoryApiService = new AesirxPimCategoryApiService();
      const respondedData = await aesirxPimCategoryApiService.getList({ 'list[limit]': 9999 });

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
    try {
      const aesirxPimProductApiService = new AesirxPimProductApiService();
      const respondedData = await aesirxPimProductApiService.getList(filters);
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
      const aesirxPimUtilApiService = new AesirxPimUtilApiService();
      const respondedData = await aesirxPimUtilApiService.getListPublishStatus();
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
      const aesirxPimProductApiService = new AesirxPimProductApiService();
      const respondedData = await aesirxPimProductApiService.getDetailInfo(id);
      return respondedData;
    } catch (error) {
      // no error throw
    }

    return false;
  }

  async updateStatus(arr, status, callbackOnSuccess, callbackOnError) {
    try {
      const aesirxPimProductApiService = new AesirxPimProductApiService();
      const respondedData = await aesirxPimProductApiService.updateStatus(arr, status);
      runInAction(() => {
        callbackOnSuccess(respondedData, 'Updated successfully');
      });
      return respondedData;
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }

    return false;
  }

  async deleteProducts(arr, callbackOnSuccess, callbackOnError) {
    try {
      const aesirxPimProductApiService = new AesirxPimProductApiService();
      const respondedData = await aesirxPimProductApiService.deleteProducts(arr);
      runInAction(() => {
        callbackOnSuccess(respondedData, 'Deleted successfully');
      });
      return respondedData;
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }

    return false;
  }
}
